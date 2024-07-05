import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

import { useNavigate, Link } from 'react-router-dom';

function RegisterPage(){
    const {
        register, 
        handleSubmit,
        formState : {errors },
    } = useForm();
    const {signup, isAuthenticated, errors: RegisterErrors } = useAuth();

    const navigate = useNavigate();

    //si esta autentificado redirige
    useEffect( () =>{                   
        if (isAuthenticated){ 
            navigate("/tasks")};
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        //console.log(values);
        signup(values);
    });

    return(
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 bg-zinc-800 max-w-md p-10 rounded-md shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Regístrate</h2>
                {
                    RegisterErrors.map((error,i) => (
                      <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                      </div>  
                    ))
                }
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("nombreUsuario", { required: true})}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Usuario"
                    />
                    {errors.nombreUsuario && (
                        <p className='text-red-500'>Usuario requerido</p>
                    )}

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
                        Regístrate
                    </button>
                </form>    
                <p className='flex gap-x-2 justify-between'>
                    ¿Ya tienes una cuenta? <Link to="/login" 
                    className='text-sky-500'>Iniciar Sesión</Link>
                </p>            
            </div>
        </div>

    );
};

export default RegisterPage;
