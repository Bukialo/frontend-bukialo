import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h1>BUKIALO</h1>
        <p>Siempre un paso adelante.</p>
        <p>© 2025 Bukialo. Todos los derechos reservados.</p>
      </div>
      <div className="footer-center">
        <p>¡Dejá tu correo y te enviamos más información!</p>
        <input type="email" placeholder="Escribí tu correo aquí." />
        <p>No compartiremos tu correo con nadie.</p>
        <button>Enviar</button>
      </div>
      <div className="footer-right">
        <a href="#">Enlaces</a>
        <Link to="/contact">Contacto</Link>
        <a href="#">Referencias</a>
        <a href="#">Defensa al consumidor</a>
      </div>
    </footer>
  );
;
};

export default Footer;
