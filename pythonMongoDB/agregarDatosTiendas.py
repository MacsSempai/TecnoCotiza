import jsonschema
from pymongo import MongoClient
from bson import ObjectId

#==========================================================================================
#======AGREGAR DATOS A COLECCION TIENDA
#==========================================================================================

#Campos y tipos de datos a necesitar en la Coleecion Tiendas
tienda = {
    "type": "object",
    "properties": {
        "nombre": {"type": "string"},
        "sitioWeb":{"type":"string",
               "pattern": "^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$" #Se pide que el dato empieze de forma http(s)
        },
        "reseña": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "calificacion": {"type": "number", "minimum": 0, "maximum": 5}, #calificacion de 0-5
                    "comentario": {"type": "string"},
                    "fecha": {"type": "string", "format": "date"}
                },
                "required": ["calificacion", "comentario", "fecha"]
            }
        }
    },#los campos que se van a requeridos de forma obligatoria
    "required": [ "nombre", "sitioWeb"]  
}

# Función para insertar datos en MongoDB
def insertar_datos(datos):
    try:
        # Validar los datos con el esquema
        jsonschema.validate(instance=datos, schema=tienda) #Validacion de datos a ingresar, verficados por la plantilla
        client = MongoClient('mongodb://localhost:27017/')# Conectar a la base de datos
        database = client['PruebaMongoDB_!'] #Base de datos 
        coleccion = database['tiendas']# Coleccion (tiendas)
        # Insertar los datos en la colección
        coleccion.insert_one(datos)
        print("Datos insertados correctamente.")
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación: {e}")
    except Exception as e:
        print(f"Error: {e}")

# Ejemplo de datos para insertar
datos_validos = {
    "id_tienda":"662c5c545c0bc05ca9412974"
}
id=ObjectId("662c5c545c0bc05ca9412974")

#Datos campo TIENDA
datos_validos = {
    "nombre": "PC factory",
    "sitioWeb": "https://www.pcfactory.cl/",
    "reseña":[{
        "calificacion": 5,
        "comentario": "Excelente tienda",
        "fecha": "2024-04-01"
        }
    ]
}

# Intentar insertar los datos
insertar_datos(datos_validos)