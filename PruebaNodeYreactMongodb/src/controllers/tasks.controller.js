//Importamos el modelo de la BD para poder modificar la BD
import Task from "../models/tasks.model.js";

//Devueltas incluirán no solo la información de las tareas, sino también los detalles del usuario asociado.
export const getTasks = async (req, res) => {
  try {
    // tasks -> tiene todo los valores de tareas de la BD
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user"); // devuelva los datos de toda la coleccion de user
    res.json(tasks); // devulve un json de tasks
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTasks = async (req, res) => {
  try {
    // al recibir los datos los guardamos en title, description, date
    const { title, description, date } = req.body;

    // console.log(req.user);///para ve que tiene req.user

    //crea una nueva objeto tasks
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id, // debido al authRequired, que se ejecuta antes, este nos da el user
    });
    //como es async se usa await para espera a que se guarden los datos
    //se guardan los datos del objeto creado en la DB
    const savedTasks = await newTask.save();
    res.json(savedTasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req, res) => {
  try {
    //se espera que se obtenga el id enviado por la URL, para obter el objeto id en la BD
    const task = await Task.findById(req.params.id).populate("user");

    // si no se encutra la task, envia un 404 y un mensaje json
    if (!task) return res.status(404).json({ mensaje: "tarea no encontrada" });

    //si encuentra la tarea, devuelve en un json la tasks con id envido por URL
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    //se espera que se obtenga el id enviado por la URL, para obter el objeto id en la BD
    const task = await Task.findByIdAndDelete(req.params.id);

    // si no se encutra la task, envia un 404 y un mensaje json
    if (!task) return res.status(404).json({ mensaje: "tarea no encontrada" });

    ////si encuentra la tarea, devuelve en un json la tasks eliminda con id envido por URL
    //res.json(task);

    return res.sendStatus(204); //204-> todo salio bien pero no devuelvo nada
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const updateTask = async (req, res) => {
  try {
    //se espera que se obtenga el id enviado por la URL, para obter el objeto id en la BD
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // en task se guarda la task actualiza(no la que se habia elimindao)
    });

    // si no se encutra la task, envia un 404 y un mensaje json
    if (!task) return res.status(404).json({ mensaje: "tarea no encontrada" });

    //si encuentra la tarea, devuelve en un json  la tasks actualizada con id envido por URL
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};
