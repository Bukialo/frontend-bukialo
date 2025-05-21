import "./Footer.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalCustom from "../../moddals/modal.jsx";
import astroCheck from "../../../assets/astronauta-computadora.png";

const Footer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    setModalOpen(true);
    setEmail("");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-left">
          <h1>BUKIALO</h1>
          <p>Siempre un paso adelante.</p>
          <p>© 2025 Bukialo. Todos los derechos reservados.</p>
        </div>
        <div className="footer-center">
          <form className="form-footer" onSubmit={handleSend}>
            <p>¡Dejá tu correo y te enviamos más información!</p>
            <input
              type="email"
              placeholder="Escribí tu correo aquí."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p>No compartiremos tu correo con nadie.</p>
            <button type="submit">Enviar</button>
          </form>
        </div>
        <div className="footer-right">
          <a href="#">Enlaces</a>
          <Link to="/contact">Contacto</Link>
          <a href="#">Referencias</a>
          <a href="#">Defensa al consumidor</a>
        </div>
      </footer>
      <ModalCustom
        open={modalOpen}
        onClose={handleCloseModal}
        title="¡Gracias !"
        image={astroCheck}
        message="Pronto recibirás un correo con más detalles."
      />
    </>
  );
};

export default Footer;