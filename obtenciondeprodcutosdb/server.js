const express = require('express');
const cors = require('cors');
const connectDB = require('./conexion/db');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Configurar CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Permite solo solicitudes de este origen
  optionsSuccessStatus: 200 // Algunos navegadores antiguos (IE11, varios SmartTVs) se bloquean al 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/productos', productoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

