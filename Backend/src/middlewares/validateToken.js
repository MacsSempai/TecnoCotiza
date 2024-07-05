// los middlewares son funciones que se ejecutan antes de llegar a una ruta

import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

//necesita los parametros req, res, next(la siguiente ruta si hay un token) para se un middlewares
export const authRequired = (req, res, next) =>{

    const { token } = req.cookies;
    
    if(!token) 
        return res.status(401).json({mensaje : "no token, no autorizado"});

        jwt.verify(token, TOKEN_SECRET, (err, user)=> {
            if(err) return res.status(401).json({mensaje : "token invalido"});
            
            req.user = user
            
            next();
        });
};