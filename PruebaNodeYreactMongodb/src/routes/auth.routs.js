import {Router} from 'express'
import {login, register , logout, profile} from "../controllers/auth.controller.js"

import { authRequired } from '../middlewares/validateToken.js';

const router = Router()

          //rutas  , funciones a usar
router.post('/register', register); //envio de datos, ejecuta la funcion register
router.post('/login', login);  //se ejecuta la funcio que esta en controller
router.post('/logout', logout); //envia logout

router.get('/profile', authRequired, profile);

export default router;
