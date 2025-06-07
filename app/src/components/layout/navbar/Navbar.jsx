import { useAuth } from "../../../authContext/authContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import astronautaProfile from "../../../assets/astronauta-profile.png";
import "./Navbar.css";
import logoBuk from "../../../assets/logo-buk.png"; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav className={`navbar-custom ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content-custom">
        <h1 className="navbar-title">
          <Link to="/">
            <img
              src={logoBuk}
              alt="Bukialo logo"
              style={{ height: "38px", objectFit: "contain" }}
            />
          </Link>
        </h1>
        <div className="navbar-main-action">
          {buttons.map((btn, idx) => {
            if (btn.icon) {
              return (
                <span
                  key="profile-icon"
                  className="navbar-profile-icon-wrapper"
                >
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
                <button
                  className={`main-action-btn${
                    isRegister ? " transparent" : ""
                  }`}
                >
                  {btn.label}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;