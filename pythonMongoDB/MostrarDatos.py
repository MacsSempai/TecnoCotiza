import datetime
from pymongo import MongoClient # type: ignore
from bson import ObjectId


#=================================================================================
#=====Relacion un usario con un arreglo objetos de id referenciados a un tienda===
#=================================================================================

try:
    client = MongoClient('localhost',27017) #conexion a base de datos local
    database = client['PruebaMongoDB_!'] #nombre de la base de datos
    collection = database['usuarios']#Nombre de la coleccion a utilzar 
    proc = database['productos']#Coleccion productos a usar
    
    documents = collection.find({"nombre":"miguel"})#consulta sobre colecciones con nombre=miguel  
    #-------Mostrar todas los datos de productos de usuario-----
    print("------Mostrar cada uno de los favoritos de del usuario miguel -----")
    # print("primero: ",documents)
    
    # for md in documents:#Muestra los usuarios de nombre miguel con sus datos
    #     print("miguel",md)
    
    for d in documents:#Muesta el arreglo de los id de favoritos
        a= d["favoritos"]
        print(a)

    for x in a:#Muestra uno por uno de los datos de favorito(de cada producto)
        z=proc.find({"_id":ObjectId(x)})
        for ll in z:
            print(ll)
        
except Exception as ex:
    print("Error durante la conexión {}".format(ex))
finally:
    print("Conexion finalizada")
