import { TOKEN_SECRET } from '../config.js'
import jwt from 'jsonwebtoken';

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        //Se crea el token
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d", //expira en un dia
            },
            (err, token) => {
                if(err) reject(err); //si algo sale mal
                resolve(token) //si salio bien devuelve el token
            }
        );
    })
}