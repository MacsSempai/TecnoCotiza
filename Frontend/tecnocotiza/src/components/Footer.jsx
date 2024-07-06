import React from "react";
import '../css/Footer.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer=()=>{
    return(
        <div class='container'>
            <footer className="footer">
                <div className="footer-social">
                    
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                    
                </div>
                <div className="footer-links">
                    
                    <ul className="list">Navegar
                        <li href="/hatware"><a>Hardware</a></li>
                        <li href="/perifericos"><a>Perifericos</a></li>
                        <li href="/dispositivos-portatiles"><a>Dispositivos Portatiles</a></li>
                        <li href="/electronica-consumo"><a>Electronica de Consumo</a></li>
                    </ul>
                </div>
                <p>© 2024 TecnoCotiza. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
export default Footer;
