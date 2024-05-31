import React, { useState, useEffect } from 'react';

const App = () => {
  const [setUsuarios ]= useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Realizar la solicitud GET al backend en modo cors al montar el componente
    fetch('http://localhost:1300/usuarios', {
      method: 'GET',
      mode: 'cors'
    })
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const fetchUsuarios = () => {
    fetch('http://localhost:1300/usuarios')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error fetching data');
      })
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const registroUsers = async () => {
    try {
      const response = await fetch('http://localhost:1300/usuarios', {//se realiza una solicitud POST a la ruta '/usurios' del servidor
      //envia los datos del usuario en el cuerpo de la solicitud en formato json
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, email, password })//combierte el objeto JavaScript en una cadena Json para enviar como cuerpo de la solicitud
      });
      //se hace una comprobacion si la respuesta del backend
      // si es corecta envia un mensaje que se envio corectamente
      if (response.ok) {
        alert('Usuario registrado correctamente');
        // Actualizar la lista de usuarios después de registrar uno nuevo
        fetchUsuarios();
        // después del registro exitoso actulaizara los campos del registro
        setNombre('');
        setEmail('');
        setPassword('');
        
      } else {// si no es corecta envia un mensaje de error 
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    }  catch (error) {//captura cualquier error que ocurra durante la solicitud
      //muestra un mensaje de error en la consola del navegador 
      console.error('Error:', error);
      alert('Error al comunicarse con el servidor');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto de enviar el formulario
    registroUsers(); // Llama a la función de registro de usuarios al hacer clic en el botón
  };

  return (
    <>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        /><br /><br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Registrar Usuario</button>
        
      </form>
    </>
  );
};

export default App;