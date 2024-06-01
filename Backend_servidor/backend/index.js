
//se llaman a las librerias node que se estar utilizando en el backend
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
//se llama a la carpeta de las rutas
const usuariosRoutes = require('./routes/usuarios'); 
const app = express();// se hace una instancia para configurar el servidor del backend
const port = process.env.PORT || 1300;//se crea el puerto del servidor del backend

app.use(express.json());//se estara usando para la manipulacion de los datos de tipo json el elservidor
// se configura cors permitiendo la solicitudes desde el localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use(morgan('dev'));// se establese como se estar 
// se utiliza para servir archivos estaticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));
app.use(usuariosRoutes);//se estara utilñizando las rutas de los usuarios

  
// se establece conexión a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/tecnocotiza');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw (error);
    }
};
// se hace una comprobasion de que la base de datos se este escuchando en el el servidor
connectDB().then(() => {
    const server = app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });

    
});
module.exports = app;// de exporta la configuracion del servidor para utilizarse en el frontend