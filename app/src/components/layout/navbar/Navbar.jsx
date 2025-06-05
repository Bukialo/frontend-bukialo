import { useAuth } from "../../../authContext/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import astronautaProfile from "../../../assets/astronauta-profile.png";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cierra el menú al navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Cierra el menú si se hace click fuera del menú lateral en móvil
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.classList.contains("navbar-hamburger")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Lógica para los botones según la ruta y autenticación
  let buttons = [];

  if (userData) {
    buttons = [
      {
        icon: (
          <img
            src={astronautaProfile}
            alt="Perfil"
            className="navbar-profile-icon"
            onClick={() => navigate("/profile")}
            title="Ir a mi perfil"
            style={{ cursor: "pointer" }}
          />
        ),
      },
      {
        label: "Salir",
        onClick: () => {
          logout();
          navigate("/", { replace: true });
        },
      },
    ];
  } else if (location.pathname === "/") {
    buttons = [
      {
        label: "Registrarme",
        to: "/register",
      },
      {
        label: "Iniciar Sesión",
        to: "/login",
      },
    ];
  } else if (location.pathname === "/register") {
    buttons = [
      {
        label: "Iniciar Sesión",
        to: "/login",
      },
    ];
  } else if (location.pathname === "/login") {
    buttons = [
      {
        label: "Registrarme",
        to: "/register",
      },
    ];
  } else {
    buttons = [
      {
        label: "Registrarme",
        to: "/register",
      },
    ];
  }

  return (
    <nav className={`navbar-custom${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-content-custom">
        <div className="navbar-left">
          <h1 className="navbar-title">
            <Link to="/">BUKIALO</Link>
          </h1>
        </div>
        <div className="navbar-right">
          <button
            className={`navbar-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menú"
            type="button"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
          <div
            ref={menuRef}
            className={`navbar-main-action${menuOpen ? " open" : ""}`}
            style={menuOpen ? { zIndex: 110 } : {}}
          >
            <button
              className="navbar-close-btn"
              style={{ display: menuOpen ? "block" : "none" }}
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              type="button"
            >
              ×
            </button>
            {buttons.map((btn, idx) => {
              if (btn.icon) {
                return (
                  <span key="profile-icon" className="navbar-profile-icon-wrapper">
                    {btn.icon}
                  </span>
                );
              }
              const isRegister = btn.label === "Registrarme";
              return btn.onClick ? (
                <button
                  className={`main-action-btn${isRegister ? " transparent" : ""}`}
                  onClick={btn.onClick}
                  key={btn.label}
                >
                  {btn.label}
                </button>
              ) : (
                <Link to={btn.to} key={btn.label}>
                  <button className={`main-action-btn${isRegister ? " transparent" : ""}`}>
                    {btn.label}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={`navbar-backdrop${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
        tabIndex={-1}
        aria-hidden={!menuOpen}
      ></div>
    </nav>
  );
};

export default Navbar;