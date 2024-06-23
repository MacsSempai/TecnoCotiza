import requests
from bs4 import BeautifulSoup
import mysql.connector
from mysql.connector import Error
from datetime import datetime

# Función para conectar a la base de datos
def conectar_bd():
    try:
        conexion = mysql.connector.connect(
            host='localhost',
            database='Cotiza',
            user='root',
            password=''
        )
        if conexion.is_connected():
            return conexion
    except Error as e:
        print("Error al conectar a MySQL:", e)
        return None

# Función para insertar un producto en la base de datos
def insertar_producto(conexion, nombre, caracteristicas, categoria, imagen, fecha):
    try:
        cursor = conexion.cursor()
        consulta = "INSERT INTO Producto (NombreProducto, Caracteristicas, Categoria, ImagenProducto, FechaExtraccion) VALUES (%s, %s, %s, %s, %s)"
        datos = (nombre, caracteristicas, categoria, imagen, fecha)
        cursor.execute(consulta, datos)
        conexion.commit()
        return cursor.lastrowid
    except Error as e:
        print("Error al insertar producto:", e)
        return None

# Función para insertar un precio en la base de datos
def insertar_precio(conexion, id_producto, precio, id_tienda, fecha):
    try:
        cursor = conexion.cursor()
        consulta = "INSERT INTO Precio (IDProducto, PrecioProducto, IDTienda, FechaHoraExtraccion) VALUES (%s, %s, %s, %s)"
        datos = (id_producto, precio, id_tienda, fecha)
        cursor.execute(consulta, datos)
        conexion.commit()
        return cursor.lastrowid
    except Error as e:
        print("Error al insertar precio:", e)
        return None

# Función para extraer características de una página web
def extraer_caracteristicas(soup):
    caracteristicas = ""
    tables = soup.find_all('div', class_='table__content--two-column')

    for table in tables:
        columns = table.find_all('div', class_='link')
        if len(columns) == 2:
            caracteristicas += f"{columns[0].text.strip()}: {columns[1].text.strip()}\n"

    return caracteristicas if caracteristicas else None

# Función principal para hacer scraping y guardar datos en la base de datos
def hacer_scraping_y_guardar(url, id_tienda, conexion):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extracción del nombre del producto para ambas tiendas
        if id_tienda == 1:  # PC Factory
            nombre_element = soup.find('div', class_='paragraph color-dark-2')
            nombre = nombre_element.text.strip() if nombre_element else None
            if not nombre:
                return None

            # Extracción de características del producto
            caracteristicas = extraer_caracteristicas(soup)

            # Extracción de la categoría del producto
            categoria_element = soup.find('h1', class_='title-md title-md--bold color-primary-1')
            categoria = categoria_element.text.strip() if categoria_element else None

            # Extracción de la imagen del producto
            imagen_element = soup.find('img', class_='img-fluid')
            imagen = imagen_element['src'] if imagen_element else None

            # Extracción del precio del producto
            precio_element = soup.find('div', class_='price-xl color-gray-1')
            precio = None
            if precio_element:
                precio = precio_element.text.strip().replace('$', '').replace('.', '').replace(' ', '')
                precio = float(precio)

        elif id_tienda == 2:  # SP Digital
            nombre_element = soup.find('h1', class_='Fractal-Typography--base Fractal-Typography__typography--subtitle Fractal-Typography__typography--default Fractal-Typography__typography--left product-detail-module--productName--asMKF')
            nombre = nombre_element.text.strip() if nombre_element else None
            if not nombre:
                return None

            # Para SP Digital, dejamos las características, categoría, imagen y precio como nulos
            caracteristicas = None
            categoria = None
            imagen = None
            precio = None

        else:
            return None

        fecha = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Inserción del producto en la base de datos
        id_producto = insertar_producto(conexion, nombre, caracteristicas, categoria, imagen, fecha)
        if id_producto:
            # Si es PC Factory, procedemos a insertar el precio en la base de datos
            if id_tienda == 1:  
                insertar_precio(conexion, id_producto, precio, id_tienda, fecha)
            
            return id_producto
        else:
            return None

    except Exception as e:
        print("Error al hacer scraping:", e)
        return None 

# Función principal
def main():
    conexion = conectar_bd()
    if conexion:
        n_pcfactory = 50000
        n_spdigital = 50000
        bucle = True
        total_products_pcfactory = 0
        total_products_spdigital = 0
        while bucle:
            url_pcfactory = f"https://www.pcfactory.cl/producto/{n_pcfactory}"
            url_spdigital = f"https://www.spdigital.cl/products/{n_spdigital}"
            product_id_pcfactory = hacer_scraping_y_guardar(url_pcfactory, 1, conexion)  # ID de tienda para PC Factory es 1
            product_id_spdigital = hacer_scraping_y_guardar(url_spdigital, 2, conexion)  # ID de tienda para SP Digital es 2

            if product_id_pcfactory:
                total_products_pcfactory += 1
                print(f"Producto de PC Factory guardado en la base de datos con ID: {product_id_pcfactory}")
            if product_id_spdigital:
                total_products_spdigital += 1
                print(f"Producto de SP Digital guardado en la base de datos con ID: {product_id_spdigital}")

            n_pcfactory += 1
            n_spdigital += 1

            # Control de la barra de carga y contador de productos encontrados
            progress = (n_pcfactory - 50000) / 50100
            print(f"\rProgress (PC Factory): [{'#' * int(50 * progress):50s}] {n_pcfactory - 50000}/100 - Productos encontrados (PC Factory): {total_products_pcfactory}", end=" ")

            progress = (n_spdigital - 50000) / 50100
            print(f"\rProgress (SP Digital): [{'#' * int(50 * progress):50s}] {n_spdigital - 50000}/100 - Productos encontrados (SP Digital): {total_products_spdigital}", end=" ")

            if n_pcfactory > 50100 or n_spdigital > 50100:
                bucle = False
        
        conexion.close()
        print("\nScraping Completed!")
    else:
        print("No se pudo conectar a la base de datos")


if __name__ == "__main__":
    main()
