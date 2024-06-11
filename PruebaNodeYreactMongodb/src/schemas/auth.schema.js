//validaciones

import {z} from 'zod'

//{email, nombreUsuario, contraseña}
// z podemos datos tipos de datos, podemos validar datos
export const registerSchema = z.object({
    //username es de tipo sting y es requerido
    nombreUsuario: z.string({
        required_error: "nombreUsuario es requerido",
    }),
    email: z.string({
        required_error: "email es requerido",
    }).email({
        message: "Email invalido",
    }),
    contraseña: z.string({
        required_error: "contraseña requerida",
    }).min(6,{
        message: "La contraseña debe ser de al menos 6 caracteres",
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: "email es requerido",
    }).email({
        message: "Correo Invalido",
    }),
    contraseña: z.string({
        required_error: "contraseña requerida",
    }).min(6,{
        message: "La contraseña debe ser de al menos 6 caracteres",
    }),

});