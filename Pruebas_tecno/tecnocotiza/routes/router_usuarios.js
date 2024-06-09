const express = require('express');//se llama la libreria express
const router = express.Router();//se llama la funcion Router de express
const Usuario = require('../models/Usuarios'); // se llama la ruta de modelo de usuarios
//se defina la ruta GET para los usuarios, ejecutando la función de controlador asincrónica definid
router.get('/usuarios', async (req, res) => {
    try {
    const usuarios = await Usuario.find().exec();//se utiliza para buscar todos los datos de los usurios 
    res.json(usuarios);
    } catch (error) {
      // encaso de que no busuqe usurio arroja un error por la consola(terminal)
        console.error('Error al obtener usuarios: ', error); 
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});
//se defina la ruta POST para los usuarios, ejecutando la función de controlador asincrónica definid
router.post('/usuarios', async (req, res) => {
  //se extrae los campos de nombre, email del cuerpo de la solicitud POST
    const { nombre, email } = req.body;
  
    try {
      const nuevoUsuario = new Usuario({ nombre, email });// se crea un nuevo usuario
      await nuevoUsuario.save();//se guarda el nuevo usuario en la base de datos
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      // encaso de que no busuqe usurio arroja un error por la consola(terminal)
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  });

module.exports = router;// se exporta las ruatas de usuarios par utilizarse en la carpeta public
