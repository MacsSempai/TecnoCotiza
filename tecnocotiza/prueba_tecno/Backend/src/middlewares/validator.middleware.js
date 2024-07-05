//

export const validateSchema =  (schema) => (req, res, next) => {
    try {
        //compara el esquema con el req.body
        schema.parse(req.body);
        next();
    }  catch (error){
        // devuelva solo el mesaje de error se zod, y mapea todos los errores
        return res
            .status(400)
            .json(error.errors.map((error) => error.message));
    }
};