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

module.exports = router;
