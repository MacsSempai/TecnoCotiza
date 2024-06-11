import {z} from 'zod'

export const createTasksSchema = z.object({
    title: z.string({
        required_error: "title es requerido",
    }),

    description: z.string({
        required_error: "description debe ser un string",
    }), //es opcional

    //date debe ser un tipo datetime y es opcional
    date: z.string().datetime().optional(),
})