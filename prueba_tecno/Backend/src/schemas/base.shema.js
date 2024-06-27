const mongoose = require('mongoose');

const cotizacionesSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Reference to the Usuario model
    required: true,
  },
  productos: {
    type: [
      {
        cantidad: { type: Number, required: true },
        fecha: { type: Date, required: true },
      },
    ],
  },
});

const usuariosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true, validate: { validator: (v) => /\S+@\S+\.\S+/.test(v), message: '{VALUE} is not a valid email address' } },
  password: { type: String, required: true, minlength: 8, maxlength: 20 },
  favoritos: { type: [mongoose.Schema.Types.ObjectId], ref: 'Producto' }, // Reference to the Producto model (optional)
});

const productosSchema = new mongoose.Schema({
  id_tienda: { type: mongoose.Schema.Types.ObjectId, ref: 'Tienda', required: true }, // Reference to the Tienda model
  tienda: { type: String, required: true },
  nombreProducto: { type: String, required: true },
  categoria: { type: String, required: true },
  precio: { type: Number, required: true },
  url: { type: String, required: true },
  fechaDeExtraccion: { type: Date, required: true },
  reseña: {
    type: [
      {
        calificacion: { type: Number, required: true },
        comentario: { type: String, required: true },
        fecha: { type: Date, required: true },
      },
    ],
  },
  Precio_Historico: {
    type: [
      {
        fecha: { type: Date, required: true },
        precio: { type: Number, required: true },
      },
    ],
  },
});

const tiendasSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  sitioWeb: { type: String, required: true },
  reseña: {
    type: [
      {
        calificacion: { type: Number, required: true },
        comentario: { type: String, required: true },
        fecha: { type: Date, required: true },
      },
    ],
  },
});

const Cotizacion = mongoose.model('Cotizacion', cotizacionesSchema);
const Usuario = mongoose.model('Usuario', usuariosSchema);
const Producto = mongoose.model('Producto', productosSchema);
const Tienda = mongoose.model('Tienda', tiendasSchema);

// Now you can use these models for data validation and manipulation with Mongoose
