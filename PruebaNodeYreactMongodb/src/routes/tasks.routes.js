import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { 
    getTasks, 
    createTasks, 
    getTask, 
    updateTask, 
    deleteTask,
} from '../controllers/tasks.controller.js';

import {validateSchema} from '../middlewares/validator.middleware.js';
import {createTasksSchema} from '../schemas/task.schema.js';

const router = Router();

//no rquiere nada, debe ser autentificado y despues ejecuta la funcion getTasks
router.get('/tasks', authRequired, getTasks);


//rquiere un id , debe ser autentificado y despues ejecuta la funcion getTasks
router.get('/tasks/:id', authRequired, getTask); 


//no rquiere nada, debe ser autentificado, y luego se ejecuta createTasks
router.post('/tasks', authRequired , validateSchema(createTasksSchema), createTasks);


//requiere un id, debe ser autentificado, y ejecuta delete task
router.delete('/tasks/:id', authRequired ,  deleteTask);


//actuliza una tarea, debe estar autentificado, y luego utiliza la funcion updateTasks
router.put('/tasks/:id', authRequired,  updateTask); 

export default router