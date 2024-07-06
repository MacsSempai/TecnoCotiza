import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: SigninErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) return navigate("/");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-gray-900 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl text-center font-bold mb-6 text-white">Inicio Sesión</h1>
        {SigninErrors.map((error, i) => (
          <div className="bg-red-600 p-2 text-white m-2 rounded" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="my-4">
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo"
          />
          {errors.email && <p className="text-red-500">Correo requerido</p>}

          <input
            type="password"
            {...register("contraseña", { required: true })}
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.contraseña && (
            <p className="text-red-500">Contraseña requerida</p>
          )}
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded my-2 hover:bg-green-600"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="flex justify-center text-white">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
