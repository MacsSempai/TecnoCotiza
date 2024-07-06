import React from 'react';
import './Perfil_usuario.css';

export default function Perfil_usuario() {
  return (
    <div className="contenedor-principal">
      <section className="perfil-usuario">
        <div className="Tarjeta_perfil">
          <div className="perfil_imagesn">
            <img src="src/components/images/monitor.jpg" alt="Avatar" className="avatar" />
            <h5>Nombre usuario</h5>
            <p>Web Designer</p>
            <i className="icono"></i>
          </div>
          <div className="Detalle_perfil">
            <h6>Informacion Personal</h6>
            <hr className="Divisor" />
            <div className="Detallitos">
              <div className="Detalle">
                <h6>Email</h6>
                <p className="texto_variables">info@example.com</p>
              </div>
              <div className="Detalle">
                <h6>Telefono</h6>
                <p className="texto_variables">+569 333333</p>
              </div>
            </div>

            <hr className="Divisor" />
            <div className="Detallitos">
              <div className="Detalle">
                <h6>Cotizaciones</h6>
                <p className="texto_variables">cotizacion 1</p>
              </div>
            </div>

            <div className="social-links">
              <a href="#!"><i className="fab fa-facebook me-3"></i></a>
              <a href="#!"><i className="fab fa-twitter me-3"></i></a>
              <a href="#!"><i className="fab fa-instagram me-3"></i></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}