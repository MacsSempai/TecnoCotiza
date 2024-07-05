import {Router} from 'express'
import {login, register , logout, profile, verifyToken} from "../controllers/auth.controller.js"

import { authRequired } from '../middlewares/validateToken.js';
import {validateSchema} from '../middlewares/validator.middleware.js' //para validar los datos que se enviarion 
import {registerSchema, loginSchema} from '../schemas/auth.schema.js'

const router = Router()

          //rutas  , funciones a usar
router.post('/register', validateSchema(registerSchema), register); //envio de datos, ejecuta la funcion register
router.post('/login', validateSchema(loginSchema), login);  //se ejecuta la funcio que esta en controller
router.post('/logout', logout); //envia logout

router.get('/verify', verifyToken);
router.get('/profile', authRequired, profile);

export default router;
