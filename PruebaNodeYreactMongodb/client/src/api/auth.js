//uso de la API, backend
import axios from "./axios";

// se usa el metodo post y se le pasara un usuario
export const registerRequest = (user) => axios.post('/register', user);

export const loginRequest = (user) => axios.post('/login', user);

export const verityTokenRequet = () => axios.get('/verify');

export const hacerCotizacion = (cot) => axios.post('/cotizaciones',cot);

export const getCotizacionesRequet = (id) => axios.get(`/cotiProductosId/${id}`);
