import jsonschema
from pymongo import MongoClient
from datetime import date


#==========================================================================================
#======AGREGAR DATOS A COLECCION historialPrecios
#==========================================================================================

#Campos y tipos de datos a necesitar en la Colecion historialPrecios

historialPrecio ={
    "type": "object",
    "properties": {
        "productoId":{
             "type":"string",
             "pattern": "^[0-9a-fA-F]{24}$" #espefica un formato de id de referencia
         },
        "historial": {
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
        jsonschema.validate(instance=datos, schema=historialPrecio) #Validacion de datos a ingresar, verficados por la plantilla
        client = MongoClient('mongodb://localhost:27017/')# Conectar a la base de datos
        database = client['PruebaMongoDB_!'] #Base de datos 
        coleccion = database['historialPrecios']# Coleccion (historialPrecios)
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
    "productoId":"662a5d9e98aa86df610b75ea",
    "historial":[{
        "precio":300000,
        "fecha":str(date.today())  ##agrega la fecha del momento (año-mes-dia)
    }]
}

# Intentar insertar los datos
insertar_datos(datos_validos)