
import React from 'react';
import RegistroUsers from './registroUsers'; // Ajusta la ruta de importación según la estructura de tu proyecto
import Navbar from './components/Navbar';
import { TbLayoutNavbar } from 'react-icons/tb';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <RegistroUsers />
      
      
    </div>
  );
}

export default App;