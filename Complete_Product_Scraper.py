
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import logging

# Configuring logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def fetch_product_names(url):
    """
    Fetch product names from the given URL using BeautifulSoup to parse the HTML.

    :param url: URL of the webpage to scrape
    :return: A list of product names
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
    Insert the product names into a MongoDB collection.

    :param product_names: List of product names to be inserted
    :param db_uri: MongoDB URI
    :param db_name: Name of the database
    :param collection_name: Name of the collection
    :return: List of inserted IDs or None if insertion fails
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
    Fetch product names from multiple pages under a base URL using pagination.

    :param base_url: The base URL of the category page
    :param num_pages: Number of pages to scrape
    :return: A list of all product names across the specified pages
    """
    all_product_names = []
    for page in range(1, num_pages + 1):
        url = f"{base_url}?page={page}"
        product_names = fetch_product_names(url)
        all_product_names.extend(product_names)
        logging.info(f"Fetched {len(product_names)} products from {url}")
        if not product_names:
            logging.info(f"No more products found at page {page}. Stopping.")
            break  # Stop if a page has no products to avoid unnecessary requests
    return all_product_names

def fetch_from_multiple_categories(categories_url):
    """
    Fetch product names from multiple categories aiming for at least 50 products per category.

    :param categories_url: List of tuples with (category_name, category_url)
    :return: Dictionary with category names as keys and list of product names as values
    """
    results = {}
    num_pages_per_category = 5  # Aim for at least 50 products assuming 10-12 products per page
    for category_name, category_url in categories_url:
        logging.info(f"Fetching products for category: {category_name}")
        products = fetch_all_product_names(category_url, num_pages_per_category)
        results[category_name] = products
        logging.info(f"Fetched a total of {len(products)} products for {category_name}")
    return results


# Constants for MongoDB
db_uri = 'mongodb://localhost:27017/'
db_name = 'tecnocotiza'
collection_name = 'productos'

# Category and pagination setup
category_url = "https://linio.falabella.com/linio-cl/category/cat70057/Notebooks"
num_pages = 5  # Number of pages you want to scrape per category

# Fetching product names from the specified category and number of pages
product_names = fetch_all_product_names(category_url, num_pages)

# Inserting fetched products into MongoDB
inserted_ids = insert_products_into_mongodb(product_names, db_uri, db_name, collection_name)
if inserted_ids:
    logging.info(f"Successfully inserted products with IDs: {inserted_ids}")
else:
    logging.error("Failed to insert products or no products were fetched.")