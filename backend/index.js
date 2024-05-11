const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const path = require('path');
const usuariosRoutes = require('./routes/usuarios'); 


const app = express();
const port = process.env.PORT || 1300;

app.use(express.json()); 


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(usuariosRoutes);

  
// Conexión a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/tecnocotiza');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw (error);
    }
};

connectDB().then(() => {
    const server = app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });

    
});
module.exports = app;