import mongoose from "mongoose";

const cotizacionSchema = new mongoose.Schema({
   // la cotizacion esta referencia haci un usuario(ObjectId)
   usuario_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //Se hace referencia a la colecciones User (users)
    required: true
},

  productos: {
    type: [
      String
      // {
        
        // idProducto: {type: String, required: true},
        // cantidad: { type: Number, required: true },
        // fecha: { type: Date, required: true },
      // },
    ],
  },
});

//export default mongoose.model("Task", taskSchema);
export default mongoose.model("cotizacion", cotizacionSchema);
