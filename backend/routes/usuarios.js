const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuarios'); 
//rutaminto get de usuarios
router.get('/usuarios', async (req, res) => {
    try {
    const usuarios = await Usuario.find().exec();
    res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios: ', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});
router.post('/usuarios', async (req, res) => {
    const { nombre, email } = req.body;
  
    try {
      const nuevoUsuario = new Usuario({ nombre, email });
      await nuevoUsuario.save();
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  });

module.exports = router;
