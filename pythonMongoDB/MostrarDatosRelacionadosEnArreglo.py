import datetime
from pymongo import MongoClient 
from bson import ObjectId

#=================================================================================
#=====Relacion un usario con un array de array de id referenciados a un tienda===
#=================================================================================

try:
    client = MongoClient('localhost',27017) #conexion a base de datos local
    database = client['PruebaMongoDB_!'] #nombre de la base de datos
    collection = database['usuarios']#Nombre de la coleccion a utilzar(usuarios)
    proc = database['productos']#Coleccion productos a usar
    
    documents = collection.find({"nombre":"Fermin"})#consulta sobre colecciones con nombre=miguel  
    #-------Mostrar todas los datos de productos de usuario-----
    print("------Mostrar cada uno de los favoritos de del usuario miguel -----")
    
    # list_documents=list(documents["favoritos"])
    # print("primero1: ",list_documents)
    
    #print(documents)
    # for md in documents:#Muestra los usuarios de nombre miguel con sus datos
    #     print("miguel",md)
    
    
    print("primero",documents)
    
    
    for d in documents:#Muesta el arreglo de los id de favoritos
        print(d["favoritos"])#se especifica que se mostrara solo los datos del campo favoritos
        a=d["favoritos"]
        
    # print("datos:: ", a[0][0])
    # print("datos:: ", a[1][0])
    
    for i in range(len(a)):#recorre cada datos del campo favorito
        aa=a[i][0] #debido el dato esta en un arreglo de arreglos, pero que dada arreglo solo cuenta con un dato
        print(aa,"----------",type(aa))
        r = proc.find({"_id":ObjectId(aa) }) #Se hace la relacion del campo favorito de la coleccion usuario, y se piede ver en la tienda productos que id estan sujeto a esos ides
        
        for j in r:#Se hace el for para mostra cada uno de los datos
            print(j) #se puede dejar como j["tienda"] -> para ver solo el valor del campo tienda
        
        
except Exception as ex:
    print("Error durante la conexión {}".format(ex))
finally:
    print("Conexion finalizada")
