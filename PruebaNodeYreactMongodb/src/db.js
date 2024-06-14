import mongoose from 'mongoose'



//funcion para conectar a la base de datos
export const connectDB = async() => {
    try{
        //await mongoose.connect('mongodb://localhost:27017/PruebaFullstack');
        await mongoose.connect('mongodb://localhost:27017/PruebaMongoDB_!');
        console.log(">>> BD conectada")
    }catch (error){
        console.log(error);
    }
};

