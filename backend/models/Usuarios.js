const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, // Definir nombre como String y requerido
    email: { 
        type: String, 
        required: true, // Hacer que el campo email también sea requerido
        unique: true,  // Asegurar que el email sea único en la base de datos
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido'] // Usar una expresión regular para validar el formato de email
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;