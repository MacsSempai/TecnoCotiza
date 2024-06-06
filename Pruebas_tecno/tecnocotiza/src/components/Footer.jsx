import React from "react";
import './Footer.css';
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
                        <li href="/hatware"><a>hatware</a></li>
                        <li href="/perifericos"><a>perifericos</a></li>
                        <li href="/dispositivos-portatiles"><a>dispisitivos portatiles</a></li>
                        <li href="/electronica-consumo"><a>electronica consumo</a></li>
                    </ul>
                </div>
                <p>© 2024 TecnoCotiza. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
export default Footer;