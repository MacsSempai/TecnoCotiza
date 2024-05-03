const { Router } = require('express');
const router = Router();

const Usuario = require('../models/Usuarios'); 

router.get('/Usuarios', async (req, res) => {
    try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios: ', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
});

module.exports = router;
