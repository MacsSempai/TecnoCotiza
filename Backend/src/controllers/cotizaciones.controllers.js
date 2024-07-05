import Cotizacion from "../models/cotizaciones.js";

export const CrearCotizacion = async (req, res) => {
  const { usuario_id, productos } = req.body;

  try {
    const cotizacion = new Cotizacion({
      usuario_id,
      productos,
      //fecha: Date.now(),
    });

    const savedCotizacion = await cotizacion.save();

    res.json({
      message: "Cotización creada con éxito",
      savedCotizacion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear cotización" });
  }
};

export const getCotizaciones = async (req, res) => {
  try {
    // tasks -> tiene todo los valores de tareas de la BD
    const cotizaciones = await Cotizacion.find({
      user: req.user.id,
    }).populate("user"); // devuelva los datos de toda la coleccion de user
    res.json(cotizaciones); // devulve un json de tasks
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//devuelve los id de productos, pero de un usuario especifico, devulve el arrego de idsPruductos
export const getCotiUser = async (req, res) => {
  try {
    // 1. Obtención del ID de usuario
    // const {userId} = req.params.id; // Suponiendo que 'id' es el parámetro para el ID de usuario

    console.log("parametros:", req.params.id);
    // 2. Búsqueda de cotizaciones
    const cotizaciones = await Cotizacion.find({ usuario_id:  req.params.id });

    // 3. Verificación de cotizaciones encontradas
    if (cotizaciones.length === 0) {
      console.log("No se encontraron cotizaciones para el usuario:",  req.params.id);
      res
        .status(404)
        .json({ message: "No hay cotizaciones para este usuario" });
      return;
    }

    // 4. Extracción de IDs de productos
    const cotizacionesId = cotizaciones.reduce((acc, cotizacion) => {
      return acc.concat(
        cotizacion.productos.map((producto) => producto)
      );
    }, []);

    // 5. Envío de la respuesta con IDs de productos
    res.json(cotizacionesId );
  } catch (error) {
    console.error("Error al obtener cotizaciones:", error);
    console.log("parametros:", req.params);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Cotizacion.find({ user: "ID_DEL_USUARIO" }, (err, cotizaciones) => {
//   if (err) {
//     console.error("Error al obtener cotizaciones:", err);
//     return;
//   }

//   // Si no se encuentran cotizaciones, manejar el caso
//   if (cotizaciones.length === 0) {
//     console.log(
//       "No se encontraron cotizaciones para el usuario:",
//       "ID_DEL_USUARIO"
//     );
//     return;
//   }

//   // Obtener IDs de productos utilizando reduce y _id
//   const productIDs = cotizaciones.reduce((acc, cotizacion) => {
//     return acc.concat(
//       cotizacion.productos.map((producto) => producto.idProducto)
//     );
//   }, []);
//   console.log("IDs de productos:", productIDs);
// });
