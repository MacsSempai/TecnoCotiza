import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import logging

# Configuración del logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def fetch_product_names(url):
    """
    Obtiene los nombres de los productos de la URL dada utilizando BeautifulSoup para analizar el HTML.

    :param url: URL de la página web a raspar
    :return: Una lista de nombres de productos
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            products = soup.select('b.subTitle, b.pod-subTitle')
            product_names = [product.get_text(strip=True) for product in products]
            return product_names
        else:
            logging.error(f'Failed to fetch from URL: {url}. Status code: {response.status_code}')
            return []
    except Exception as e:
        logging.error(f'Error fetching product names: {e}')
        return []

def insert_products_into_mongodb(product_names, db_uri, db_name, collection_name):
    """
    Inserta los nombres de los productos en una colección de MongoDB.

    :param product_names: Lista de nombres de productos a insertar
    :param db_uri: URI de MongoDB
    :param db_name: Nombre de la base de datos
    :param collection_name: Nombre de la colección
    :return: Lista de IDs insertados o None si falla la inserción
    """
    if not product_names:
        logging.info("No products to insert.")
        return None
    
    try:
        client = MongoClient(db_uri)
        db = client[db_name]
        collection = db[collection_name]
        documents = [{'name': name} for name in product_names]
        result = collection.insert_many(documents)
        logging.info(f'Inserted {len(result.inserted_ids)} products successfully.')
        return result.inserted_ids
    except Exception as e:
        logging.error(f'Error inserting products into MongoDB: {e}')
        return None

def fetch_all_product_names(base_url, num_pages):
    """
    Obtiene los nombres de todos los productos de múltiples páginas bajo una URL base utilizando paginación.

    :param base_url: La URL base de la página de la categoría
    :param num_pages: Número de páginas a raspar
    :return: Una lista de todos los nombres de productos a través de las páginas especificadas
    """
    all_product_names = []
    for page in range(1, num_pages + 1):
        url = f"{base_url}?page={page}"
        product_names = fetch_product_names(url)
        all_product_names.extend(product_names)
        logging.info(f"Fetched {len(product_names)} products from {url}")
        if not product_names:
            logging.info(f"No more products found at page {page}. Stopping.")
            break  # Detener si una página no tiene productos para evitar solicitudes innecesarias
    return all_product_names

def fetch_from_multiple_categories(categories_url):
    """
    Obtiene nombres de productos de múltiples categorías apuntando a al menos 50 productos por categoría.

    :param categories_url: Lista de tuplas con (nombre_de_categoría, url_de_categoría)
    :return: Diccionario con nombres de categorías como claves y lista de nombres de productos como valores
    """
    results = {}
    num_pages_per_category = 5  # Apuntando a al menos 50 productos asumiendo 10-12 productos por página
    for category_name, category_url in categories_url:
        logging.info(f"Fetching products for category: {category_name}")
        products = fetch_all_product_names(category_url, num_pages_per_category)
        results[category_name] = products
        logging.info(f"Fetched a total of {len(products)} products for {category_name}")
    return results



def fetch_product_details_pcfactory(product_id):
    """
    Fetch product details from PCFactory for a given product ID.
    """
    url = f"https://www.pcfactory.cl/producto/{product_id}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            product_name = soup.find('div', class_='paragraph color-dark-2', itemprop='name').get_text(strip=True) if soup.find('div', class_='paragraph color-dark-2', itemprop='name') else 'Product name not found'
            return {'id': product_id, 'name': product_name}
        else:
            logging.error(f'Failed to fetch from URL: {url}. Status code: {response.status_code}')
            return None
    except Exception as e:
        logging.error(f'Error fetching product details from PCFactory: {e}')
        return None

def scrape_pcfactory(start_id, end_id):
    """
    Raspa PCFactory para obtener detalles de productos dentro de un rango dado de IDs.
    """
    all_products = []
    for product_id in range(start_id, end_id + 1, 10):
        product_details = fetch_product_details_pcfactory(product_id)
        if product_details:
            all_products.append(product_details)
            logging.info(f"Successfully fetched: {product_details}")
        else:
            logging.warning(f"No product found for ID: {product_id}")
    return all_products

def insert_pcfactory_products_into_mongodb(product_details, db_uri, db_name, collection_name):
    """
    Inserta los detalles de los productos de PCFactory en una colección de MongoDB.
    """
    if not product_details:
        logging.info("No PCFactory products to insert.")
        return None
    
    try:
        client = MongoClient(db_uri)
        db = client[db_name]
        collection = db[collection_name]
        result = collection.insert_many(product_details)
        logging.info(f'Inserted {len(result.inserted_ids)} PCFactory products successfully.')
        return result.inserted_ids
    except Exception as e:
        logging.error(f'Error inserting PCFactory products into MongoDB: {e}')
        return None

# Constantes para MongoDB
db_uri = 'mongodb://localhost:27017/'
db_name = 'tecnocotiza'
collection_name = 'productos'

# Configuración de categoría y paginación
# Configuración de categoría y paginación para Linio
category_url = "https://linio.falabella.com/linio-cl/category/cat70057/Notebooks"
num_pages = 5  # Número de páginas que deseas raspar por categoría

# Obteniendo nombres de productos de la categoría y número de páginas especificados para Linio
product_names = fetch_all_product_names(category_url, num_pages)

# Insertando los nombres de productos obtenidos de Linio en MongoDB
if product_names:
    inserted_ids_linio = insert_products_into_mongodb(product_names, db_uri, db_name, collection_name)
    if inserted_ids_linio:
        logging.info(f"Successfully inserted Linio products with IDs: {inserted_ids_linio}")
    else:
        logging.error("Failed to insert Linio products or no products were fetched.")
else:
    logging.error("No products were fetched from Linio.")

# Configuración inicial para PCFactory
start_id = 51307
end_id = 51700

# Ejecución del scraping para PCFactory
products_pcfactory = scrape_pcfactory(start_id, end_id)
if products_pcfactory:
    logging.info(f"Successfully fetched {len(products_pcfactory)} products from PCFactory")
    # Insertando los productos obtenidos de PCFactory en MongoDB
    inserted_ids_pcfactory = insert_pcfactory_products_into_mongodb(products_pcfactory, db_uri, db_name, collection_name)
    if inserted_ids_pcfactory:
        logging.info(f"Successfully inserted PCFactory products with IDs: {inserted_ids_pcfactory}")
    else:
        logging.error("Failed to insert PCFactory products or no products were fetched.")
else:
    logging.error("No products were fetched from PCFactory.")

