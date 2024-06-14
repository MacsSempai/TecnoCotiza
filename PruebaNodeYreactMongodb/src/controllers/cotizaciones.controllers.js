
import Cotizacion from "../models/cotizaciones.js";

export const CrearCotizacion = async (req, res) => {
  
    const { usuario_id, productos } = req.body;
  
    try {
                             
      const cotizacion = new Cotizacion({
        usuario_id,
        productos,
        //fecha: Date.now(),
      });
  
      const savedTasks =  await cotizacion.save();
  
      res.json({
        message: "Cotización creada con éxito",
        savedTasks,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear cotización' });
    }
};