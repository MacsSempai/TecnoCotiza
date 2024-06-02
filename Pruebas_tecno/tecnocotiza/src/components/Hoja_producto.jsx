import React from 'react';
import './Hoja_producto.css';

function TablaIzquierda() {
  return (
    <div className="tabla izquierda">
      <img src="images/monitor.jpg" alt="Imagen del producto" />
    </div>
  );
}

const TablaMedia=({ modelo })=> {
    return (
      <div className="tabla media">
        <h2>{modelo}</h2>
        <div>
          <h2>Características</h2>
          <table>
            <tbody>
              <tr>
                <td>Tipo</td>
                <td>LED</td>
              </tr>
              <tr>
                <td>Tamaño</td>
                <td>23.8"</td>
              </tr>
              <tr>
                <td>Resolución</td>
                <td>Full HD (1920x1080)</td>
              </tr>
              <tr>
                <td>Tiempo de respuesta (GTG)</td>
                <td>1 ms</td>
              </tr>
              <tr>
                <td>Tiempo de respuesta (MPRT)</td>
                <td>Desconocido</td>
              </tr>
              <tr>
                <td>Tasa de refresco</td>
                <td>144 Hz</td>
              </tr>
              <tr>
                <td>Curvatura</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Soporte G-Sync</td>
                <td>G-Sync Compatible</td>
              </tr>
              <tr>
                <td>¿Soporta FreeSync?</td>
                <td>Sí</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2>Especificaciones secundarias</h2>
          <table>
            <tbody>
              <tr>
                <td>Contraste</td>
                <td>1000:1</td>
              </tr>
              <tr>
                <td>Brillo</td>
                <td>300 cd/m2</td>
              </tr>
              <tr>
                <td>Puertos USB</td>
                <td>No posee</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
const Derecha = ()=>{
  return(
    <div className='continer'>
      <ul className='tienda'>
          <li>
            <button onClick={() => window.open('https://www.pcfactory.cl', '_blank')}>PC pcFactory</button>
          </li>
          <li>
            <button onClick={() => window.open('https://linio.falabella.com/linio-cl', '_blank')}>Linio</button>
          </li>
          <li>
            <button onClick={() => window.open('https://www.spdigital.cl', '_blank')}>SP Digital</button>
          </li>
          
      </ul>
    </div>
    
  );
};



function Hoja_producto() {
  return (
    <div className="container">
      <TablaIzquierda />
      <TablaMedia modelo="MSI Optix G241" />
      <Derecha/>
    </div>
  );
}
export default Hoja_producto;