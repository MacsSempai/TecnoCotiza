from pymongo import MongoClient
from bson import ObjectId
# Conectar a la base de datos MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['tecnocotiza']

# Definir plantillas (documentos base)
plantilla_usuario = {
    "tipo": "usuario",
    "nombre": "",
    "email": "",
    "contraseña": "",
    "edad": None,
    "favoritos": [ObjectId(), ObjectId()]
}

plantilla_producto = {
    "id_tienda": ObjectId(),
    "tipo": "producto",
    "nombre_producto": "",
    "precio": None,
    "categoria": "",
    "url": "",
    "fechaDeExtraccion": "2022-04-21",  # Corregido el nombre del campo
    "reseña": [{"calificacion": None, "comentario": "", "fecha": None}]
}

plantilla_tienda = {
    "nombre_tienda": "",  # Renombrado el campo
    "sitioWeb": "",
    "reseña": [{"calificacion": None, "comentario": "", "fecha": None}]
}

plantilla_cotizaciones = {
    "usuario_id": ObjectId(),
    "cotizaciones": [{"productoid":ObjectId(), "cantidad": None, "fecha": None}]
}
plantilla_PrecioHistorico = {
    "productoid": ObjectId(),
    "precios": [{"fecha": None,"precio":None}]
}

# Función para crear un nuevo documento basado en una plantilla
def crear_documento_desde_plantilla(plantilla, campos):
    nuevo_documento = plantilla.copy()
    nuevo_documento.update(campos)  # Actualizar campos con valores específicos
    return nuevo_documento

# Ejemplo de creación de un nuevo usuario basado en la plantilla de usuario
nuevo_usuario = crear_documento_desde_plantilla(plantilla_usuario, {
    "nombre": "Ejemplo Usuario",
    "email": "usuario@example.com",
    "contraseña": "password123",
    "edad": 30,
})

# Insertar el nuevo usuario en la colección de usuarios
usuarios = db['usuarios']
usuarios.insert_one(nuevo_usuario)

# Ejemplo de creación de un nuevo producto basado en la plantilla de producto
nuevo_producto = crear_documento_desde_plantilla(plantilla_producto, {
    "id_tienda":ObjectId(),
    "nombre_producto": "Producto de Ejemplo",
    "precio": 19.99,
    "categoria": "Electrónica",
    "url": "https://www.ejemplo.com/producto",
    "fechaDeExtraccion": "2022-04-21",
    "reseña": [{"calificacion": 4, "comentario": "Buena calidad", "fecha": "2022-04-22"}]
})

# Insertar el nuevo producto en la colección de productos
productos = db['productos']
productos.insert_one(nuevo_producto)

nueva_tienda= crear_documento_desde_plantilla(plantilla_tienda,{
    "nombre_tienda": "una tienda",
    "sitioWeb": "https://www.ejemplo.com",
    "reseña": [{"calificacion": 5, "comentario": "sdad", "fecha": "2021-04-04"}]
})

tiendas=db['tiendas']
tiendas.insert_one(nueva_tienda)

nuevo_cotizacion= crear_documento_desde_plantilla(plantilla_cotizaciones,{
    "usuario_id": ObjectId(),
    "cotizaciones": [{"productoid": ObjectId(), "cantidad": 5, "fecha": "2021-04-15"}]
})

cotizaciones = db['cotizaciones']
cotizaciones.insert_one(nuevo_cotizacion)

nuevo_PrecioHistorico= crear_documento_desde_plantilla(plantilla_PrecioHistorico,{
    "productoid": ObjectId(),
    "precios": [{"fecha": "2021-16","precio":20.00}]
})



precioHistorico = db['precioHistorico']
precioHistorico.insert_one(nuevo_PrecioHistorico)