import mongoose from 'mongoose';

// const cotizacionSchema = new mongoose.Schema({
//   usuario_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Usuario',
//     required: true,
//   },
//   productos: [
//     {
//       producto_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Producto',
//         required: true,
//       },
//       cantidad: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   fecha: {
//     type: Date,
//     required: true,
//   },
// });

const cotizacionSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //Se hace referencia a la colecciones User (users)
    required: true
},

  productos: {
    type: [String],
    required: true,
  },
});

//export default mongoose.model("Task", taskSchema);
export default mongoose.model('Cotizacion', cotizacionSchema);
