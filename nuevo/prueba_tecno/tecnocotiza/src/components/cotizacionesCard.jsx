import { useTasks } from "../context/TasksContext";


import { Link } from "react-router-dom";

function CotizacionesCard({ task }) {

  const { deleteTask } = useTasks();
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task._id}</h1>
        <div className="flex gap-x-4 items-center">
          <button
            // onClick={() => {
            //   //console.log(task._id);
            //   deleteTask(task._id);
            // }}
          >
            Eliminar
          </button>
          <Link to='/'>Editar</Link>
        </div>
      </header>
      <p className="text-slate-300">{task._id}</p>
    </div>
  );
}

export default CotizacionesCard;
