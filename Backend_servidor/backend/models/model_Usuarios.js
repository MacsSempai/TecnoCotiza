const mongoose = require('mongoose');//se llama la libreria mongoose para interacuar con la base de datos
// se crea el modelo de los usuarios
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, //define el campo nombre con cadena que es boligatorio
    email: { 
        type: String, //define el campo email con cadena 
        required: true, //que es boligatorio el email
        unique: true,  // se indica que el email debe ser unico
        // se expecifica los caracteres del email
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido'] 
    }
});

// se crea un modelo de Mongoose llamando Usuario basado en la creacion del modelo usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;//exportar modelado de usuarios 