import { useAuth } from "../../../authContext/authContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const { userData, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        <div className="navbar-icon">
          <Link to="/">bookealo</Link>
        </div>

        <div className="navbar-main-buttons">
          {userData && (
            <Link to="/dashboard">
              <button className="nav-button">Dashboard</button>
            </Link>
          )}
          <Link to="/contact">
            <button className="nav-button">Contacto</button>
          </Link>
        </div>

        <div className="navbar-dropdown">
          <button onClick={toggleButtons} className="icon-button">
            <img
              src="src/assets/contrasena.png"
              alt="Menú de usuario"
              className="userData-icon"
            />
          </button>

          {showButtons && (
            <div className="dropdown-menu">
              {userData ? (
                <>
                  <Link to="/profile">
                    <button className="dropdown-button">Perfil</button>
                  </Link>
                  <button
                    className="dropdown-button logout-button"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="dropdown-button">Iniciar sesión</button>
                  </Link>
                  <Link to="/register">
                    <button className="dropdown-button">Registrarse</button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
