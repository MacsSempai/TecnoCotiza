const cotizacionesSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario", // Reference to the Usuario model
    required: true,
  },
  productos: {
    type: [
      {
        idProducto: {type: String, required: true},
        cantidad: { type: Number, required: true },
        fecha: { type: Date, required: true },
      },
    ],
  },
});
