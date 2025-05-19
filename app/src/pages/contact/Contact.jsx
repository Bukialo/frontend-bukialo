import React, { useState } from 'react';
import './Contact.css';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviar correo electrónico');
    // Aquí puedes agregar la lógica para enviar el correo electrónico
  };

  return (
    <div className="contacto">
      <h2>¡Contactanos!</h2>
      <p>
        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
      </p>
      <div className="informacion">
        <h3>Nuestra información</h3>
        <p>
          <strong>Nombre de la app:</strong> Mi App
        </p>
        <p>
          <strong>Descripción:</strong> Esta es una aplicación de ejemplo.
        </p>
        <p>
          <strong>Dirección:</strong> Calle Falsa 123, Ciudad Falsa
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Deja tu correo electrónico</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Contacto;