import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // la tarea esta referencia haci un usuario(ObjectId)
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //Se hace referencia a la colecciones User (users)
        required: true
    },
},{
    timestamps: true
});

export default mongoose.model("Task", taskSchema);