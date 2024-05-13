// Importamos express
import express from 'express'; //const express = require('express');
import morgan from 'morgan'; //para uso de peticiones
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routs.js'
import taskRoutes from './routes/tasks.routes.js'

// Inicializamos express, es nuestro servidor
const app = express();

//midelware
app.use(morgan('dev')); //muestras las peticiones
app.use(express.json()); //transforma los request body en formato json
app.use(cookieParser()); //para poder mostrar lo que dice en cookies

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

export default app;// exporta app(otros archivos los pueden importar)
