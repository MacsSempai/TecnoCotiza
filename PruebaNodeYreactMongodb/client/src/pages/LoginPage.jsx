import React, { useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

function LoginPage(){
    const {register, 
        handleSubmit,
        formState: {errors},
    } =  useForm();

    const {signin, errors: SigninErrors} = useAuth();

    const  onSubmit = handleSubmit((data) => {
        signin(data)
    });

    return(
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">        
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className="text-3xl text-center font-bold mb-6">Inicio Sesión</h1>
                {
                    SigninErrors.map((error,i) => (
                      <div className='bg-red-500 p-2 text-white m-2' key={i}>
                        {error}
                      </div>  
                    ))
                }
                <form onSubmit={onSubmit}>
                    <input type="email" {...register("email", {required: true})}
                        className="w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2"
                        placeholder="Correo"
                    />
                    {errors.email && (
                        <p className='text-red-500'>Correo requerido</p>
                    )}

                    <input type="password" {...register("contraseña",{required: true})}
                        className="w-full bg-zinc-700 text-while px-4 py-2 rounded-md my-2"
                        placeholder="Contraseña"
                    />
                    {errors.contraseña && (
                        <p className='text-red-500'>Contraseña requerida</p>
                    )}
                    <button type="submit"  className="bg-emerald-500  text-white font-bold py-2 px-4 rounded my-2">
                        Iniciar Sesión
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between'>
                    ¿No tienes una cuenta? <Link to="/register" 
                    className='text-sky-500'>Regístrarse</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage