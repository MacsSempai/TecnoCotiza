const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/tecnocotiza', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB en localhost');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB', err);
    process.exit(1); 
  }
};

module.exports = connectDB;
