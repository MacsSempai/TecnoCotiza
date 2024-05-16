// backend/models/Product.js

import  mongoose from 'mongoose';

// Definimos el esquema para las reseñas
const reviewSchema = new mongoose.Schema({
    calificacion: {
        type: Number,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }
});

// Definimos el esquema para los productos
const productSchema = new mongoose.Schema({
    tiendas: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    },
    nombreProducto: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    fechaDeExtraccion: {
        type: Date,
        required: true
    },
    // reseña: [reviewSchema] // Utilizamos el esquema de reseñas definido anteriormente
});

// Creamos y exportamos el modelo basado en el esquema
export default mongoose.model('producto', productSchema);

