import { Router } from "express";
import { CrearCotizacion, getCotizaciones ,getCotiUser} from "../controllers/cotizaciones.controllers.js";
import { authRequired } from '../middlewares/validateToken.js'

const router = Router();

// router.post('/cotizaciones', async (req, res) => {
//   const { usuario_id, productos } = req.body;

//   const cotizacion = new Cotizacion({
//     usuario_id,
//     productos,
//     fecha: Date.now(),
//   });

//   await cotizacion.save();

//   res.json({
//     message: 'Cotización creada con éxito',
//     cotizacion,
//   });
// });

router.get('/cotizaciones', authRequired, getCotizaciones);

router.post('/cotizaciones',CrearCotizacion );


router.get('/cotiProductosId/:id', getCotiUser)

// router.get("/cotizaciones/:usuario_id", async (req, res) => {
//   const { usuario_id } = req.params;

//   const cotizaciones = await Cotizacion.find({ usuario_id });

//   res.json({
//     cotizaciones,
//   });
// });


export default router;