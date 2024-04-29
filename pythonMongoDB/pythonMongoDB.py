import jsonschema
from pymongo import MongoClient
from bson import ObjectId

# Esquema para los datos

cotizaciones = {
    "type": "object",
    "properties": {
        "usuario_id":{"type": "ObjectId"},
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

usuario = {
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
            "type": "array",
            "items": {
                "type":"string",
                "pattern": "^[0-9a-fA-F]{24}$" #espefica un formato de id de referencia
            },
        }
    },
    "required": ["nombre","email","password"]    
}

producto = {
    "type": "object",
    "properties": {
        "id_tienda":{"type": "ObjectId"},
        "tienda": {"type": "string"},
        "nonbreProducto": {"type": "string"},
        "categoria": {"type": "string"},
        "precio": {"type":"integer"},
        "url":{"type":"string"},
        "fechaDeExtraccion":{"type": "string", "format": "date"},
        "reseña":{
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
    "required": ["id_tienda","tienda", "nonbreProducto", "categoria","precio","url","fechaDeExtraccion"]
}

tienda = {
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

historialPrecio ={
    "type": "object",
    "properties": {
        "productoId":{"type": "ObjectId"},
        "historia": {
            "type":"array",
            "items":{
                "type":"object",
                "properties":{
                    "precio": {"type": "number"},
                    "fecha": {"type": "string", "format": "date"}
                },
                "required": [ "precio", "fecha"]
            }
        }

    },
    "required": [ "productoId","historial"]
    
}

# Función para insertar datos en MongoDB
def insertar_datos(datos):
    try:
        # Validar los datos con el esquema
        jsonschema.validate(instance=datos, schema=usuario)
        # Conectar a la base de datos
        client = MongoClient('mongodb://localhost:27017/')
        database = client['PruebaMongoDB_!']
        coleccion = database['usuarios']
        # Insertar los datos en la colección
        coleccion.insert_one(datos)
        print("Datos insertados correctamente.")
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación: {e}")
    except Exception as e:
        print(f"Error: {e}")

# Ejemplo de datos para insertar
datos_validos = {
    "nombre": "Pedro",
    "email": "perdro@gmail.com",
    "password": "password123",
    "favoritos": ["662a5d9e98aa86df610b75ea"]
}

# Intentar insertar los datos
insertar_datos(datos_validos)