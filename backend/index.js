const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const usuariosRoutes = require('./routes/usuarios'); // Importar las rutas de los libros

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware
app.use(express.json()); // Middleware para procesar JSON

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('file'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public'))); // Middleware para servir archivos estáticos

// Usar las rutas de los libros
app.use('/api/usuarios', usuariosRoutes);

// Conectar a la base de datos MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/tecnocotiza',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

test('connects to MongoDB and starts server', async () => {
    try {
        await connectDB();
        const server = app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
            server.close();
             // Indica que la prueba ha terminado correctamente
        });
    } catch (error) {
        throw error; // Indica que la prueba falló con un error
    }
});


module.exports = app;