import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import urllib3
import logging

# Configurar el registro de errores
logging.basicConfig(filename='cintegral_scraper.log', level=logging.ERROR, format='%(asctime)s %(levelname)s: %(message)s')

def extraer_info_del_sitemap_cintegral(sitemap_url, limite_urls=200):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

    # Suprimir advertencias de verificación SSL
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

    # Conexión a MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client["tecnocotiza"]
    products_collection = db["productos"]

    try:
        response_sitemap = requests.get(sitemap_url, headers=headers, verify=False)
        if response_sitemap.status_code == 200:
            soup_sitemap = BeautifulSoup(response_sitemap.content, 'xml')
            urls = [loc.text for loc in soup_sitemap.find_all('loc')]

            if limite_urls:
                urls = urls[:limite_urls]

            for url in urls:
                try:
                    response = requests.get(url, headers=headers, verify=False)
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')

                        # Extracción de datos con robustez
                        nombre_producto = soup.find('h1', class_='product_title')
                        nombre_producto = nombre_producto.text.strip() if nombre_producto else "Nombre no disponible"

                        precio_elemento = soup.find('div', class_='jet-listing-dynamic-field__content')
                        precio_producto = precio_elemento.text.split('$')[-1].strip() if precio_elemento else "No disponible"

                        categorias = [a.text.strip() for a in soup.select('.posted_in a')]
                        imagenes = [img['src'] for img in soup.select('.wp-post-image') if img.get('src')]

                        descripcion = soup.find('div', {'id': 'tab-description'})
                        descripcion = descripcion.text.strip() if descripcion else "Descripción no disponible"

                        product_document = {
                            "url": url,
                            "name": nombre_producto,
                            "price": precio_producto,
                            "categories": categorias,
                            "images": imagenes,
                            "description": descripcion,
                            # "specifications": especificaciones  # Para futura implementación
                        }

                        products_collection.insert_one(product_document)
                        print(f"Inserted: {nombre_producto}")
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


