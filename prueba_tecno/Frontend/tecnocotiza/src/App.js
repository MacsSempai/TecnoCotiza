import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MostrarDetalle from "./pages/productoDetalladoPage";


import TasksPage from "./pages/TasksPage";
import TasksFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

import ProtectedRouter from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./componentes/NavBar";

import CrearCotizacion from "./pages/CotizacionesPage";
import ListaProductos from "./pages/PRUEBA";
import { CotizacionProvider } from "./context/CotizacionesContext";

// import React from 'react';
// import Narvar from './components/Narvar';
import ProductList from './components/ProductList';
// import Footer from './components/Footer';
//el uso de AuthProvider espera que todo puedan usar el contexto
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <CotizacionProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <Navbar/>
              {/* <ProductList/> */}
              <Routes>
                <Route path="/" element={<ListaProductos />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/productos" element={<ListaProductos />} />
                <Route path="/productos/detallado/:id" element={<MostrarDetalle />} />

                




                <Route element={<ProtectedRouter />}>
                  <Route path="/cotizaciones" element={<CrearCotizacion />} />
                  {/* <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TasksFormPage />} />
                  <Route path="/tasks/:id" element={<TasksFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} /> */}
                </Route>
              </Routes>
              {/* <Footer/> */}
            </main>
          </BrowserRouter>
        </CotizacionProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
