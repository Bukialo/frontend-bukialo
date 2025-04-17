import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
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
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.full_name
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
          username: "",
          email: "",
          password: "",
          full_name: "",
        });
      }
    } catch (error) {
      console.error("Error registrando usuario:", error);
      alert("Hubo un error al registrar el usuario");
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-box">
          <img src="src/assets/muelle.png" alt="#" className="register-icon" />

          <div className="register-form">
            <input
              type="text"
              name="username"
              placeholder="Usuario"
              className="register-input"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Correo Electrónico"
              className="register-input"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="register-input"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="full_name"
              placeholder="Nombre Completo"
              className="register-input"
              value={formData.full_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">Acepto términos y condiciones.</label>
          </div>

          <button className="register-button" onClick={handleRegister}>
            Registrarse
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
