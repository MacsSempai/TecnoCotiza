import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-zing-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/productos">
        <h1 className="text-2xl font-bold">TecnoCotiza</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Bienvenido {user.nombreUsuario}</li>
            <li>
              <Link to="/cotizaciones">Cotizaciones</Link>
            </li>
            <li>
              <Link to="/tasks">Tareas</Link>
            </li>
            <li>
              <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-sm">Agregar Tarea</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Cerrar Sesion
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
            </li>
            <li>
              <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
