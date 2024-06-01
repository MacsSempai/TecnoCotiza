import jsonschema
from pymongo import MongoClient
from bson import ObjectId

# Esquema para los datos
schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer"},
        "city": {"type": "string"}
    },
    "required": ["name", "age", "city"]
}
cotizaciones = {
    "type": "object",
    "properties": {
        "usuario_id": {
            "format": "objectid"  # Asegura que la cadena sea un ObjectId válido
        },
        "cotizaciones": {
            "type":"array",
            "items":{
                "type":"object",
                "properties":{
                    "cantidad": {"type": "number"},
                    "fecha": {"type": "string", "format": "date"}
                },
                "required": [ "cantidad", "fecha"]
            }
        }

    },
    "required": [ "usuario_id"]
}

usuarios = {
    "type": "object",
    "properties": {
        "nombre": {"type": "string"},
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 8,
            "maxLength": 20
        },
        "favoritos":{
            "type": "array"
        }
    },
    "required": ["nombre","email","password","favoritos"]    
}

productos ={
    "type": "object",
    "properties": {
        "id_tienda": {
            "format": "Objectid"  
        },
        "tienda": {"type": "string"},
        "nombreProducto": {"type": "string"},
        "categoria": {"type": "string"},
        "precio": {"type": "integer"},
        "url": {"type": "string"},
        "fechaDeExtraccion": {"type": "string", "format": "date"},
        "reseña": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "calificacion": {"type": "number"},
                    "comentario": {"type": "string"},
                    "fecha": {"type": "string", "format": "date"}
                },
                "required": ["calificacion", "comentario", "fecha"]
            }
        }
    },
    "required": ["id_tienda", "tienda", "nombreProducto", "categoria", "precio", "url", "fechaDeExtraccion"]
}

tiendas = {
    "type": "object",
    "properties": {
        "nombre": {"type": "string"},
        "sitioWeb": {"type": "string"}, 
        "reseña": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "calificacion": {"type": "number"},
                    "comentario": {"type": "string"},
                    "fecha": {"type": "string", "format": "date"}
                },
                "required": ["calificacion", "comentario", "fecha"]
            }
        }
    },
    "required": [ "nombre", "sitioWeb"]  
}



# Función para insertar datos en MongoDB
def insertar_datos_productos(datos):
    try:
        # Validar los datos de productos con el esquema de productos
        jsonschema.validate(instance=datos, schema=productos)
        
        # Conectar a la base de datos
        client = MongoClient('mongodb://localhost:27017/')
        database = client['tecnocotiza']
        
        # Acceder a la colección de productos
        coleccion_productos = database['productos']
        
        # Insertar los datos de productos en la colección de productos
        coleccion_productos.insert_one(datos)
        print("Datos de productos insertados correctamente.")
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación de productos: {e}")
    except Exception as e:
        print(f"Error al insertar datos de productos: {e}")

def insertar_datos_tiendas(datos):
    try:
        # Validar los datos de productos con el esquema de productos
        jsonschema.validate(instance=datos, schema=tiendas)
        
        # Conectar a la base de datos
        client = MongoClient('mongodb://localhost:27017/')
        database = client['tecnocotiza']
        
        # Acceder a la colección de productos
        coleccion_productos = database['tiendas']
        
        # Insertar los datos de productos en la colección de productos
        coleccion_productos.insert_one(datos)
        print("Datos de productos insertados correctamente.")
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación de productos: {e}")
    except Exception as e:
        print(f"Error al insertar datos de productos: {e}")
def insertar_datos_cotizaciones(datos):
    try:
        # Validar los datos de productos con el esquema de productos
        jsonschema.validate(instance=datos, schema=cotizaciones)
        
        # Conectar a la base de datos
        client = MongoClient('mongodb://localhost:27017/')
        database = client['tecnocotiza']
        
        # Acceder a la colección de productos
        coleccion_productos = database['cotizaciones']
        
        # Insertar los datos de productos en la colección de productos
        coleccion_productos.insert_one(datos)
        print("Datos de productos insertados correctamente.")
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación de productos: {e}")
    except Exception as e:
        print(f"Error al insertar datos de productos: {e}")

# Función para insertar datos de usuarios en MongoDB
def insertar_datos_usuarios(datos):
    try:
        # Validar los datos de usuarios con el esquema de usuarios
        jsonschema.validate(instance=datos, schema=usuarios)
        
        # Conectar a la base de datos
        client = MongoClient('mongodb://localhost:27017/')
        database = client['tecnocotiza']
        
        # Acceder a la colección de usuarios
        coleccion_usuarios = database['usuarios']
        
        # Insertar los datos de usuarios en la colección de usuarios
        coleccion_usuarios.insert_one(datos)
        print("Datos de usuarios insertados correctamente.")
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación de usuarios: {e}")
    except Exception as e:
        print(f"Error al insertar datos de usuarios: {e}")

# Ejemplo de datos válidos para insertar (usuarios)
datos_validos_usuarios = {
    "nombre": "Juan",
    "email": "juan@example.com",
    "password": "password123",
    "favoritos": ["662a5d9e98aa86df610b75ea"]
}

# Ejemplo de datos válidos para insertar (productos)
datos_validos_productos = {
    "id_tienda": ObjectId(),  # Generar un ObjectId válido como cadena
    "tienda": "Nombre de la tienda",
    "nombreProducto": "Nombre del producto",  # Corregido aquí
    "categoria": "Informática",
    "precio": 799,  # Precio debe ser un entero, no un decimal
    "url": "URL del producto",
    "fechaDeExtraccion": "2024-04-27",
    "cantidad_disponible": 10,
    "reseña": [
        {
            "calificacion": 4,
            "comentario": "Buen producto",
            "fecha": "2024-04-27"
        }
    ]
}
datos_validos_tiendas = {
    "nombre": "Nombre de la tienda",
    "sitioWeb": "https://www.ejemplodetienda.com",
    "reseña": [
        {
            "calificacion": 5,
            "comentario": "Excelente atención al cliente",
            "fecha": "2024-04-28"
        },
        {
            "calificacion": 4,
            "comentario": "Productos de calidad",
            "fecha": "2024-04-29"
        }
    ]
}
datos_validos_cotizaciones = {
    "usuario_id": ObjectId(),  # Aquí debes proporcionar el ID del usuario correspondiente
    "cotizaciones": [
        {
            "cantidad": 3,
            "fecha": "2024-04-28"
        },
        {
            "cantidad": 5,
            "fecha": "2024-04-30"
        }
    ]
}

# Intentar insertar los datos válidos de usuarios
insertar_datos_usuarios(datos_validos_usuarios)

# Intentar insertar los datos válidos de productos
insertar_datos_productos(datos_validos_productos)
insertar_datos_tiendas(datos_validos_tiendas)
insertar_datos_cotizaciones(datos_validos_cotizaciones)
