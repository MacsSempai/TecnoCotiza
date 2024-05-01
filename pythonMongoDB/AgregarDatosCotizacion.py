import jsonschema
from pymongo import MongoClient

#==========================================================================================
#======AGREGAR DATOS A COLECCION cotizaciones
#==========================================================================================

#Campos y tipos de datos a necesitar en la Colecion cotizaciones
cotizaciones = {
    "type": "object",
    "properties": {
        "usuario_id":{
             "type":"string",
             "pattern": "^[0-9a-fA-F]{24}$" #espefica un formato de id de referencia
         },
        "cotizaciones": {
            "type":"array",
            "items":{
                "type":"object",
                "properties":{
                    "id_producto":{ 
                        "type":"string",
                        "pattern": "^[0-9a-fA-F]{24}$" #espefica un formato de id de referencia
                        },
                    "cantidad": {"type": "number"},
                    "fecha": {"type": "string", "format": "date"}
                },
                "required": [ "id_producto","cantidad", "fecha"]
            }
        }

    },
    "required": [ "usuario_id","cotizaciones"]
}



# Función para insertar datos en MongoDB
def insertar_datos(datos):
    try:
        # Validar los datos con el esquema
        jsonschema.validate(instance=datos, schema=cotizaciones) #Validacion de datos a ingresar, verficados por la plantilla
        client = MongoClient('mongodb://localhost:27017/')# Conectar a la base de datos
        database = client['PruebaMongoDB_!'] #Base de datos 
        coleccion = database['cotizaciones']# Coleccion (cotizaciones)
        # Insertar los datos en la colección
        coleccion.insert_one(datos)
        print("Datos insertados correctamente.")
    except jsonschema.exceptions.ValidationError as e:
        print(f"Error de validación: {e}")
    except Exception as e:
        print(f"Error: {e}")

# Ejemplo de datos para insertar
#Datos campo COTIZACIONES
datos_validos =  {
    "usuario_id":"662d9926c14765d69805d373",
    "cotizaciones":[
            {"id_producto":"662e8e3587af0b0914a3f8e3",
             "cantidad":1,
             "fecha":str(date.today())  ##agrega la fecha del momento (año-mes-dia)
             }                        
        ]
}

# Intentar insertar los datos
insertar_datos(datos_validos)