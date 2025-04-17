import { useAuth } from "../../../authContext/authContext.jsx";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const baseUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, userData } = useAuth();

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

  const handleEmailLogin = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="src/assets/iconWeb.png" alt="Logo" className="login-icon" />

        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log("Fallo en el login");
          }}
          size="large"
          width="100%"
        ></GoogleLogin>
        <button
          className="email-button"
          onClick={() => setShowEmailForm(!showEmailForm)}
          disabled={loading}
        >
          {showEmailForm ? "Ocultar formulario" : "Ingresar con Email"}
        </button>

        {showEmailForm && (
          <div className="email-form">
            <input
              type="text"
              placeholder="Correo electrónico"
              className="email-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && <div className="error-message">{error}</div>}

            <div className="form-footer">
              <button
                className="login-button"
                onClick={handleEmailLogin}
                disabled={loading || !username || !password}
              >
                {loading ? "Cargando..." : "Iniciar sesión"}
              </button>
              <div className="footer-links">
                <a href="#" className="forgot-password-link">
                  Olvidé mi contraseña
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
