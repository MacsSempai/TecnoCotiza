import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest, verityTokenRequet, hacerCotizacion} from "../api/auth";
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

//los componentes hijos pueden acceder a los datos, sin pasar por props,
//Proporciona datos atraves de contexto
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) =>{
        try{
            const res =  await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            //se indica que el usuario ya esta autenticado
            setIsAuthenticated(true);
        } catch (error){
            console.log(error.response);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res =  await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true)
            setUser(res.data)

            
        } catch (error) {
            console.log(error)
            
            if (Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            //para el objeto mensaje como un arreglo para poder mapar como arreglo
            setErrors([error.response.data.mensaje])
        }
    };

    const haceCotizacion = async (datos) => {
        try {
            const producto = await hacerCotizacion(datos);
            
        } catch (error) {
            console.log(error)

            
            if (Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            //para el objeto mensaje como un arreglo para poder mapar como arreglo
            setErrors([error.response.data.mensaje])
            
        }
    } 

    const logout = () =>{
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);

    }
    //elimina los mensajes pasado un tiempo, depende de como se comporte errors
    useEffect(()=>{
        if (errors.length >0){
            const timer = setTimeout( () =>{
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    //si carga la pagina
    useEffect(() => {
        async function checkLogin () {
            const cookies =  Cookies.get();
            
            if(!cookies.token){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verityTokenRequet(cookies.token);

                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }

        checkLogin();

    },[]);

    return(
        <AuthContext.Provider 
        value={{
        signup,
        signin, 
        logout,
        loading,
        user,
        isAuthenticated,
        errors,
        haceCotizacion,
        }}>
            {children}
        </AuthContext.Provider>
    ) 
};