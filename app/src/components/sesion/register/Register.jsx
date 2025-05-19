import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import BackLink from "../../backLink/BackLink.jsx";

const baseUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      if (
        !formData.first_name ||
        !formData.last_name ||
        !formData.email ||
        !formData.password
      ) {
        alert("Todos los campos son obligatorios");
        return;
      }

      const response = await axios.post(`${baseUrl}/auth/register`, formData);

      if (response.status === 201) {
        alert("Usuario registrado exitosamente");
        navigate("/login");
        window.location.reload();

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error registrando usuario:", error);
      alert("Hubo un error al registrar el usuario");
    }
  };

  const goToInicio = () => {
    navigate("/");
  };

  return (
    <div className="register-container">
      <BackLink className="back-link" title="Volver al Inicio" onClick={goToInicio} />
      <div className="register-box">
        <h1 className="register-title">Registrarme</h1>
        <div className="register-form">
          <label className="register-label">Nombre</label>
          <input
            type="text"
            name="first_name"
            placeholder="Escribi tu nombre aquí"
            className="register-input"
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <label className="register-label">Apellido</label>
          <input
            type="text"
            name="last_name"
            placeholder="Escribi tu apellido aquí"
            className="register-input"
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <label className="register-label">Correo Electrónico</label>
          <input
            type="text"
            name="email"
            placeholder="Escribi tu correo aquí"
            className="register-input"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label className="register-label">Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Escribi tu contraseña aquí"
            className="register-input"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button className="register-button" onClick={handleRegister}>
          <p>Registrarme</p>
        </button>
      </div>
    </div>
  );
};

export default Register;