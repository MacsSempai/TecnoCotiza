import requests
from bs4 import BeautifulSoup
import time
from pymongo import MongoClient
from datetime import datetime

# Configuración de registro de errores
import logging
logging.basicConfig(filename='pcfactory_scraper.log', level=logging.ERROR)

def fetch_product_urls(sitemap_url):
    """Obtiene las URLs de productos del sitemap."""
    try:
        response = requests.get(sitemap_url)
        response.raise_for_status()  # Lanzar una excepción si la solicitud falla
        soup = BeautifulSoup(response.content, 'html5lib')
        urls = [loc.text for loc in soup.find_all('loc')]
        return urls
    except requests.exceptions.RequestException as e:
        logging.error(f"Error al obtener el sitemap: {e}")
        return []

def fetch_product_details(url):
    """Extrae los detalles de un producto a partir de su URL."""
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html5lib')

        product_name = soup.find('div', class_='paragraph color-dark-2', itemprop='name').get_text(strip=True)
        price = soup.find('div', class_='price-xl color-gray-1').get_text(strip=True)
        category = soup.find('h1', class_='title-md title-md--bold color-primary-1').get_text(strip=True)

        description_container = soup.find('div', class_='texto')
        description_text = ' '.join([p.get_text(strip=True) for p in description_container.find_all(['p', 'li'])]) if description_container else 'Descripción no encontrada'

        image_urls = [img.get('data-full-img') for img in soup.select('ul.product-gallery img') if img.get('data-full-img')]

        return {
            'name': product_name,
            'price': price,
            'category': category,
            'description': description_text,
            'image_urls': image_urls,
            'url': url,  # Incluir la URL del producto
            'store_name': 'PC Factory',
            'store_url': 'https://www.pcfactory.cl/'
        }
    except requests.exceptions.RequestException as e:
        logging.error(f"Error al obtener la página del producto: {e}")
        return None

# Conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["tecnocotiza"]
products_collection = db["productos"]
stores_collection = db["tiendas"]
precioHistorico_collection = db["precioHistorico"]

# Obtener URLs de productos y filtrar
product_urls = fetch_product_urls("https://www.pcfactory.cl/productos_sitemap.xml")
keywords = ['nvidia', 'teclado', 'monitor', 'mouse', 'ram', 'cpu', 'tarjeta', 'amd', 'fuente', 
            'placa madre', 'usb', 'ssd', 'memoria', 'ventilador', 'gabinete']
filtered_urls = [url for url in product_urls if any(keyword in url.lower() for keyword in keywords)]

# Scraping e inserción de datos
for url in filtered_urls[:500]:  # Limitar a 500 URLs para evitar sobrecarga
    product_details = fetch_product_details(url)
    if product_details:
        # Insertar o actualizar en la colección de productos y obtener el _id del producto
        result = products_collection.update_one(
            {"url": url}, 
            {"$set": product_details}, 
            upsert=True  # Crear el documento si no existe
        )
        product_id = result.upserted_id if result.upserted_id else products_collection.find_one({"url": url})["_id"]

        # Insertar en la colección de historial de precios
        previous_entry = precioHistorico_collection.find_one({"product_id": product_id}, sort=[("fecha", -1)])
        if not previous_entry or previous_entry["precio"] != product_details['price']:
            precioHistorico_collection.insert_one({
                "product_id": product_id,
                "fecha": datetime.now(),
                "precio": product_details['price']
            })

        # Asegurar que la tienda correspondiente esté en la colección `tiendas`
        stores_collection.update_one(
            {"product_id": product_id},
            {"$set": {
                "store_name": product_details['store_name'],  
                "product_id": product_id,
                "product_url": url
            }},
            upsert=True
        )

        print(f"Inserted/Updated: {product_details['name']} from PC Factory at URL: {url}")
        time.sleep(0.1)  # Pequeña pausa para evitar sobrecargar el servidor





