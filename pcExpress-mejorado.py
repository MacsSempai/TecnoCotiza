import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from datetime import datetime

def extraer_info_del_sitemap_limitado(sitemap_url, limite_urls=30):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }

    client = MongoClient("mongodb://localhost:27017/")
    db = client["tecnocotiza"]
    products_collection = db["productos"]
    stores_collection = db["tiendas"]
    price_history_collection = db["precioHistorico"]

    try:
        response_sitemap = requests.get(sitemap_url, headers=headers)
        if response_sitemap.status_code == 200:
            soup_sitemap = BeautifulSoup(response_sitemap.content, 'xml')
            urls = [loc.text for loc in soup_sitemap.find_all('loc')][:limite_urls]

            for url in urls:
                try:
                    response = requests.get(url, headers=headers)
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')

                        # Extraer nombre del producto
                        nombre_producto = soup.find('h1', class_='rm-product-page__title hidden-xs').text.strip()

                        # Extraer precio del producto
                        precio_producto = soup.find('div', class_='rm-product__price rm-product__price--cash').h3.text.strip()

                        # Extraer imágenes
                        imagenes = [img['src'] for img in soup.find_all('img', class_='img-responsive')]

                        # Extraer categoría (sin el enlace)
                        categoria = soup.find('a', href=lambda href: href and "/index.php?route=product/category&" in href).text.strip()

                        # Extraer especificaciones técnicas (esto puede necesitar ajustes según la estructura exacta)
                        especificaciones_div = soup.find('div', id='tab-description')
                        especificaciones = []
                        for elemento in especificaciones_div.find_all(text=True):
                            texto_limpio = elemento.strip()
                            if texto_limpio:  # Evitar líneas vacías
                                especificaciones.append(texto_limpio)

                        # Insertar producto en la colección "productos"
                        product_document = {
                            "url": url,
                            "name": nombre_producto,
                            "price": precio_producto,
                            "category": categoria,
                            "images": imagenes,
                            "specifications": especificaciones
                        }
                        result = products_collection.update_one(
                            {"url": url},
                            {"$set": product_document},
                            upsert=True
                        )
                        product_id = result.upserted_id if result.upserted_id else products_collection.find_one({"url": url})["_id"]

                        # Insertar datos de la tienda con producto en "tiendas" (individual documents)
                        store_data = {
                            "store_name": "PC-Express",
                            "product_name": nombre_producto,
                            "product_url": url,
                            "product_id": product_id
                        }
                        stores_collection.update_one(
                            {"product_url": url},
                            {"$set": store_data},
                            upsert=True
                        )

                        # Manejo del historial de precios
                        last_price_entry = price_history_collection.find_one(
                            {"product_id": product_id},
                            sort=[("date", -1)]
                        )

                        if not last_price_entry or last_price_entry['price'] != precio_producto:
                            price_history_collection.insert_one({
                                "product_id": product_id,
                                "price": precio_producto,
                                "date": datetime.utcnow()
                            })

                        print(f"Inserted/Updated: {nombre_producto} from PC-Express")
                    else:
                        print(url, f"Error {response.status_code} al acceder a la página")
                except Exception as e:
                    print(url, f"Excepción al acceder a la página: {e}")
        else:
            print(sitemap_url, f"Error {response_sitemap.status_code} al cargar el sitemap")
    except Exception as e:
        print(sitemap_url, f"Excepción al intentar cargar el sitemap: {e}")

# URL del sitemap de PC-Express
sitemap_url = 'https://tienda.pc-express.cl/sitemap.xml'
extraer_info_del_sitemap_limitado(sitemap_url)



