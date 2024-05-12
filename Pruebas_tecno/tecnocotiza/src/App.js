
import React,{ useState , useEffect} from 'react';
const App = () => {
  //declara una bariable de estdo usuarios como una matriz vacia y una funcion setUSuarios para actualizar la variable de estado
  const [usuarios, setUsuarios] = useState([]);
  //se utiliza para realizar una solicitud GET al servidor cuando el componente se monta
  useEffect(() => {
    // Realizar la solicitud GET al backend en modo cors
    fetch('http://localhost:1300/usuarios',{
      method:'GET',
      mode:'cors'
    }) 
      .then(response => response.json())// se recive los datos y los cobierte en json para expresar los datos
      .then(data => setUsuarios(data))//se acutliza los datos de usuarios con los datos recividos
      //captura cualquier error que ocurra durante la solicitud
      .catch(error => console.error('Error fetching data:', error));
  }, []); // El segundo argumento vacío [] significa que este efecto se ejecutará solo una vez al montar el componente

  return (
    <div className="App">
      <h2>Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          // rederiza los datos de cada usuario dentro del elemneto lista
          <li key={usuario.id}>{usuario._id},{usuario.nombre}, {usuario.email}</li>
          
        ))}
      </ul>
    </div>
  );
};

export default App;