import jsonschema
from pymongo import MongoClient

#==========================================================================================
#======AGREGAR DATOS A COLECCION usuarios
#==========================================================================================

#Campos y tipos de datos a necesitar en la Coleecion usuarios
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
            "minLength": 8,#minimio de longitud
            "maxLength": 20#maximo de longitud
        },
        "favoritos":{
            "type": "array",
            "items": {
                "type":"string",
                "pattern": "^[0-9a-fA-F]{24}$" #espefica un formato de id de referencia
            },
        }
    },
    "required": ["nombre","email","password"] #Campos a completar obligatorios
}


# Función para insertar datos en MongoDB
def insertar_datos(datos):
    try:
        # Validar los datos con el esquema
        jsonschema.validate(instance=datos, schema=usuario) #Validacion de datos a ingresar, verficados por la plantilla
        client = MongoClient('mongodb://localhost:27017/')# Conectar a la base de datos
        database = client['PruebaMongoDB_!'] #Base de datos 
        coleccion = database['usuarios']# Coleccion (usuarios)
        # Insertar los datos en la colección
        coleccion.insert_one(datos)
        print("Datos insertados correctamente.")
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación: {e}")
    except Exception as e:
        print(f"Error: {e}")

# Ejemplo de datos para insertar
#Datos campo USUARIOS
datos_validos =  {
    "nombre": "NombreUsuario",
    "email":"usuario@gmail.com",
    "password": "Contraseña",
    "favoritos": ["662e8e3587af0b0914a3f8e3"]
}

# Intentar insertar los datos
insertar_datos(datos_validos)