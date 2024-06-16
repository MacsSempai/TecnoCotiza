import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import urllib3
import logging
from datetime import datetime

# Configuración de registro de errores
logging.basicConfig(
    filename='cintegral_scraper.log',
    level=logging.ERROR,
    format='%(asctime)s %(levelname)s: %(message)s'
)

def extraer_info_del_sitemap_cintegral(sitemap_url, limite_urls=200):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    client = MongoClient("mongodb://localhost:27017/")
    db = client["tecnocotiza"]
    products_collection = db["productos"]
    stores_collection = db["tiendas"]
    precioHistorico_collection = db["precioHistorico"]

    try:
        response_sitemap = requests.get(sitemap_url, headers=headers, verify=False)
        if response_sitemap.status_code == 200:
            soup_sitemap = BeautifulSoup(response_sitemap.content, 'xml')
            urls = [loc.text for loc in soup_sitemap.find_all('loc')]
            urls = urls[:limite_urls] if limite_urls else urls

            for url in urls:
                try:
                    response = requests.get(url, headers=headers, verify=False)
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')

                        # Extracción de datos
                        nombre_producto = soup.find('h1', class_='product_title').text.strip()
                        precio_elemento = soup.find('div', class_='jet-listing-dynamic-field__content')
                        precio = precio_elemento.text.split('$')[-1].strip()
                        categorias = [a.text.strip() for a in soup.select('.posted_in a')]
                        imagenes = [img['src'] for img in soup.select('.wp-post-image') if img.get('src')]
                        descripcion = soup.find('div', {'id': 'tab-description'}).text.strip()

                        # Documento del producto (sin precioHistorico)
                        product_document = {
                            "url": url,
                            "name": nombre_producto,
                            "current_price": precio,
                            "categories": categorias,
                            "images": imagenes,
                            "description": descripcion,
                            "store": "cintegral",
                            # "specifications": especificaciones,  # Para futura implementación
                        }

                        # Insertar o actualizar el producto en la colección "productos" y obtener el _id del producto
                        result = products_collection.update_one(
                            {"url": url},
                            {"$set": product_document},
                            upsert=True
                        )
                        product_id = result.upserted_id if result.upserted_id else products_collection.find_one({"url": url})["_id"]

                        # Manejo del historial de precios
                        last_price_entry = precioHistorico_collection.find_one(
                            {"product_id": product_id},
                            sort=[("fecha", -1)]
                        )

                        if not last_price_entry or last_price_entry['precio'] != precio:
                            precioHistorico_document = {
                                "product_id": product_id,
                                "product_url": url,
                                "fecha": datetime.now(),
                                "precio": precio
                            }
                            precioHistorico_collection.insert_one(precioHistorico_document)

                        # Insertar datos de la tienda con producto en "tiendas"
                        store_data = {
                            "store_name": "cintegral",
                            "product_name": nombre_producto,
                            "product_url": url,
                            "product_id": product_id
                        }
                        stores_collection.update_one(
                            {"product_url": url},
                            {"$set": store_data},
                            upsert=True
                        )

                        print(f"Inserted/Updated: {nombre_producto} from Cintegral") 
                    else:
                        logging.error(f"Error {response.status_code} al acceder a la página: {url}")
                except Exception as e:
                    logging.exception(f"Excepción al acceder a la página: {url}")
        else:
            logging.error(f"Error {response_sitemap.status_code} al cargar el sitemap: {sitemap_url}") 
    except Exception as e:
        logging.exception(f"Excepción al intentar cargar el sitemap: {sitemap_url}")

# URL del sitemap de Cintegral
sitemap_cintegral_url = 'https://cintegral.cl/product-sitemap.xml'
extraer_info_del_sitemap_cintegral(sitemap_cintegral_url)





