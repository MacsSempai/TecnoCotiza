//se usa un esquema/estructura para guardar datos 

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        trim: true //borran los espacio en blanco
    },
    email: {
        type:String,
        required: true,
        trim: true, //borran los espacio en blanco
        unique: true // es unico
    },
    contraseña: {
        type: String,
        required: true,
    }
},{
    timestamps: true  //agrega la fecha de creacion
}
);

//al crear la base de datos de dice que se llame User pero mongoose le coloca users
export default mongoose.model('User',userSchema)
