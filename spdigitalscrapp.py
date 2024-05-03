import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

def extraer_info_del_sitemap_limitado(sitemap_url, limite_urls=30):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    
    # Conexión a MongoDB
    client = MongoClient("mongodb://localhost:27017/")
    db = client["tecnocotiza"]
    products_collection = db["productos"]

    # Intentar obtener el sitemap
    try:
        response_sitemap = requests.get(sitemap_url, headers=headers)
        if response_sitemap.status_code == 200:
            soup_sitemap = BeautifulSoup(response_sitemap.content, 'xml')
            urls = [loc.text for loc in soup_sitemap.find_all('loc')][:limite_urls]
            
            # Extraer nombres, precios, imágenes, categorías y especificaciones técnicas para cada URL encontrado
            for url in urls:
                try:
                    response = requests.get(url, headers=headers)
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')
                        # Extraer el nombre del producto
                        nombre_producto_h1 = soup.find('h1', {"data-fractalds": "t:a|n:typography|v:subtitle,default,left,h1"})
                        nombre_producto = nombre_producto_h1.text.strip() if nombre_producto_h1 else "Nombre del producto no encontrado"
                        # Extraer el precio del producto
                        precio_producto_span = soup.find('span', {"data-fractalds": "t:a|n:typography|v:best-price-sm,default,left,span"})
                        precio_producto = precio_producto_span.text.strip() if precio_producto_span else "Precio no encontrado"
                        # Extraer imágenes
                        imagenes = [img['src'] for div in soup.find_all('div', class_='Fractal-Image--content') for img in div.find_all('img') if 'src' in img.attrs]
                        # Extraer categorías de productos
                        categoria = soup.find('a', {"data-fractalds": "t:a|n:link|v:default", "class": "Fractal-Link--link"})
                        categoria_texto = categoria.text.strip() if categoria else "Categoría no encontrada"
                        # Extraer especificaciones técnicas
                        especificaciones = {}
                        for table in soup.find_all('table', class_='Fractal-SpecTable--table'):
                            th = table.find('th').text.strip()
                            especificaciones[th] = {}
                            for tr in table.find_all('tr')[1:]:
                                td = tr.find_all('td')
                                especificaciones[th][td[0].text.strip()] = td[1].text.strip() if len(td) > 1 else ''
                        # Preparar el documento a insertar
                        product_document = {
                            "url": url,
                            "name": nombre_producto,
                            "price": precio_producto,
                            "category": categoria_texto,
                            "images": imagenes,
                            "specifications": especificaciones
                        }
                        # Insertar el documento en MongoDB
                        products_collection.insert_one(product_document)
                        print(f"Inserted: {nombre_producto}")
                    else:
                        print(url, f"Error {response.status_code} al acceder a la página")
                except Exception as e:
                    print(url, f"Excepción al acceder a la página: {e}")
        else:
            print(sitemap_url, f"Error {response_sitemap.status_code} al cargar el sitemap")
    except Exception as e:
        print(sitemap_url, f"Excepción al intentar cargar el sitemap: {e}")

# URL del sitemap para la prueba limitada a 30 URLs sujeto a cambios pero era para acelerar las pruebas 
sitemap_full_test_url = 'https://www.spdigital.cl/sitemap.xml'
extraer_info_del_sitemap_limitado(sitemap_full_test_url)