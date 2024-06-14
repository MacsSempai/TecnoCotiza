import producto from '../models/productos.model.js'


//          requies(peticion), respons(respuesta)
export const productos= async(req, res) => {
    //console.log(req.body) ////cuando se envia un json
    
    //const {tiendas, nombreProducto, categoria, precio, url, fechaDeExtraccion, reseña} = req.body
    // console.log(email, password, username)


    try{

        const productosFound = await producto.find() //busca si existe el email de usuario

        //si no se encuentra el usuario devuelve un mensaje
        if(!productosFound) return res.status(400).json({mesaje: "no hay productos"});

        //si es que se encontro el usuario se ejecuta lo siguiete

        console.log(productosFound)

        res.json(productosFound);

    }catch(error){
        res.status(500).json({mensaje: error.mesage}); //*********
    }

};

