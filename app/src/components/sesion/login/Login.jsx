import { useAuth } from "../../../authContext/authContext.jsx";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import BackLink from "../../backLink/BackLink.jsx";
import ModalCustom from "../../moddals/modal.jsx";
import astroError from "../../../assets/astronauta-error.png"; // Usa tu imagen de error

const baseUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { login, userData } = useAuth();
  const navigate = useNavigate();

  if (userData) {
    return <Navigate to="/profile" replace />;
  }

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      const res = await axios.post(
        `${baseUrl}/auth/login_google`,
        {
          token: credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access_token, full_name, plan_type, status } = res.data;

      login(access_token, {
        full_name,
        plan_type,
        status,
      });

      console.log("Usuario autenticado:", res.data);
    } catch (err) {
      console.error("Error autenticando con backend", err);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(`${baseUrl}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token, full_name, plan_type, status } = response.data;

      login(access_token, {
        full_name,
        plan_type,
        status,
      });
    } catch (error) {
      console.error("Error en el login:", error);
      setError("Error en el login. Por favor verifica tus credenciales.");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const goToInicio = () => {
    navigate("/");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="login-bg">
      <BackLink title="Volver al Inicio" onClick={goToInicio} />
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleEmailLogin}>
          <label className="login-label" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="text"
            className="login-input"
            placeholder="Escribi tu correo aquí."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            autoComplete="username"
          />
          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="login-input"
            placeholder="Escribi tu contraseña aquí."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
          />
          {error && <div className="login-error">{error}</div>}
          <button
            className="login-btn"
            type="submit"
            disabled={loading || !username || !password}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="login-google-btn">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Fallo en el login");
            }}
            width="100%"
            text="signin_with"
            shape="rectangular"
            locale="es"
          />
        </div>
      </div>
      <ModalCustom
        open={modalOpen}
        onClose={handleCloseModal}
        title="¡Oops!"
        image={astroError}
        message="El correo o la contraseña no son correctos."
      />
    </div>
  );
};

export default Login;