import requests
from bs4 import BeautifulSoup
import time
from pymongo import MongoClient

def fetch_product_urls(sitemap_url):
    response = requests.get(sitemap_url)
    soup = BeautifulSoup(response.content, 'html5lib')
    urls = [loc.text for loc in soup.find_all('loc')]
    return urls

def fetch_product_details(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html5lib')
    #extraemos cada nombre precio categoria y descripcion sujeto a cambios para mejorar 
    product_name_div = soup.find('div', class_='paragraph color-dark-2', itemprop='name')
    product_name = product_name_div.get_text(strip=True) if product_name_div else 'Nombre no encontrado'
    price_div = soup.find('div', class_='price-xl color-gray-1')
    price = price_div.get_text(strip=True) if price_div else 'Precio no encontrado'
    category_h1 = soup.find('h1', class_='title-md title-md--bold color-primary-1')
    category = category_h1.get_text(strip=True) if category_h1 else 'Categoría no encontrada'
    description_container = soup.find('div', class_='texto')
    description_text = ' '.join([p.get_text(strip=True) for p in description_container.find_all(['p', 'li'])]) if description_container else 'Descripción no encontrada'
    
    # Nuevo bloque de extracción de URL de imagen
    image_urls = []
    gallery = soup.find('ul', class_='product-gallery')
    if gallery:
        image_tags = gallery.find_all('img')
        image_urls = [img.get('data-full-img', 'URL de imagen no encontrada') for img in image_tags if img.get('data-full-img')]
    else:
        image_urls = ['Contenedor de imagen no encontrado']
    
    return {
        'name': product_name,
        'price': price,
        'category': category,
        'description': description_text,
        'image_urls': image_urls,  # Lista de URLs de imágenes
        'url': url
    }


# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["tecnocotiza"]
products_collection = db["productos"]

# hace el fetch a los productos 
product_urls = fetch_product_urls("https://www.pcfactory.cl/productos_sitemap.xml")

# filtrado con las palabras clave esto es solo una prueba luego se perfeccionara
keywords = ['nvidia', 'teclado', 'monitor', 'mouse', 'ram', 'cpu', 'tarjeta', 'amd', 'fuente', 
            'placa madre', 'usb', 'ssd', 'memoria', 'ventilador', 'gabinete']

# con las keywords filtra mas especificamente los productos para hacerlo mas dirigido a el tema de nuestra pagina este mismo
#no diferencia entre letras mayusculas o minusculas dando paso a no tener errores y evitamos encontrar productos nulos 
filtered_urls = [url for url in product_urls if any(keyword in url.lower() for keyword in keywords)]

for url in filtered_urls[:500]:  # Limit to the first 500 URLs, adjust as needed
    try:
        product_details = fetch_product_details(url)
        products_collection.insert_one(product_details)
        print(f"Inserted: {product_details['name']} at URL: {url}")
        time.sleep(0.01)  # Reduce the sleep time to improve efficiency
    except requests.exceptions.RequestException as e:
        print(f"Request error at {url}: {e}")
    except Exception as e:
        print(f"Error scraping {url}: {e}")