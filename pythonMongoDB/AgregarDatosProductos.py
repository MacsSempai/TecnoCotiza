import jsonschema
from pymongo import MongoClient
from bson import ObjectId

# Esquema para los datos

producto = {
    "type": "object",
    "properties": {
        "id_tienda":{
             "type":"string",
             "pattern": "^[0-9a-fA-F]{24}$" #espefica un formato de id de referencia
         },
        "nombreProducto": {"type": "string"},
        "categoria": {"type": "string"},
        "precio": {"type":"integer"},
        "url":{"type":"string",
               "pattern": "^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$" #Se pide que el dato empieze de forma http(s)
        },
        "fechaDeExtraccion":{"type": "string", "format": "date"},
        "reseña":{
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "calificacion": {"type": "number", "minimum": 0, "maximum": 5},
                    "comentario": {"type": "string"},
                    "fecha": {"type": "string", "format": "date"} #año-mes-dia
                },
                "required": ["calificacion", "comentario", "fecha"]
            }
        }
    },
    #campos de datos que seran requeridos, reseña no es requerida obligatoriamente por que puede que no tenga reseñas
    "required": ["id_tienda","nombreProducto","categoria","precio","url","fechaDeExtraccion"]
}

# Función para insertar datos en MongoDB
def insertar_datos(datos):
    try:
        # Validar los datos con el esquema
        jsonschema.validate(instance=datos, schema=producto) #Validacion de datos a ingresar, verficados por la plantilla
        client = MongoClient('mongodb://localhost:27017/')# Conectar a la base de datos
        database = client['PruebaMongoDB_!'] #Base de datos 
        coleccion = database['productos']# Coleccion
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

#Datos campo productos
datos_validos = {
    "id_tienda": "662c5c545c0bc05ca941297d",
    "nombreProducto": "Monito Gamer",
    "categoria": "Monitor",
    "precio": 239000,
    "url":"https://www.falabellafalabella-cl/product/127925897/Monitor-Gamer-ELSA-23.8''-24F1P-FHD-1K-165HZ-1MS/127925898",
    "fechaDeExtraccion": "2024-04-27-",
    "reseña":[{
        "calificacion": 5,
        "comentario": "Excelente tienda",
        "fecha": "2024-04-01"
        }
    ]
}

# Intentar insertar los datos
insertar_datos(datos_validos)