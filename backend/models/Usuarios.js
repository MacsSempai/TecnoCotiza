const mongoose = require('mongoose');
//modelado de los usuarios
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, 
    email: { 
        type: String, 
        required: true, //requiere un email
        unique: true,  // solo utiliza email
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido'] // caracteres de email
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;//exportar modelado de usuarios 