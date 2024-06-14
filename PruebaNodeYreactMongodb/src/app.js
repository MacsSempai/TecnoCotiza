// Importamos express
import express from "express"; //const express = require('express');
import morgan from "morgan"; //para uso de peticiones
import cookieParser from "cookie-parser";
import cors from "cors"; //cors para que se pueda comunicar con el frontend

import authRoutes from "./routes/auth.routs.js";
import taskRoutes from "./routes/tasks.routes.js";
import productosRoutes from "./routes/productos.routs.js";

import contizacionesRoutes from "./routes/cotizaciones.routes.js";

// Inicializamos express, es nuestro servidor
const app = express();

//usamos cors para comunicar con el host del frontend
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//midelware
app.use(morgan("dev")); //muestras las peticiones
app.use(express.json()); //transforma los request body en formato json
app.use(cookieParser()); //para poder mostrar lo que dice en cookies

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", productosRoutes);
app.use("/api", contizacionesRoutes);
export default app; // exporta app(otros archivos los pueden importar)
