import "./HomePage.css";
import React, { useRef } from "react";
import astronauta from "../../assets/astronauta.png";
import astronauta2 from "../../assets/astronauta 2.png";
import CardList from "../../components/cards/Cards";

const HomePage = () => {
  const astroRef = useRef(null);
  const astro1Ref = useRef(null);

  // Animación para el astronauta de abajo
  const handleAstro2Click = () => {
    if (astroRef.current) {
      astroRef.current.classList.add("astronauta-float");
      setTimeout(() => {
        astroRef.current.classList.remove("astronauta-float");
      }, 4000); // Duración igual a la animación
    }
  };

  // Animación para el astronauta de arriba
  const handleAstro1Click = () => {
    if (astro1Ref.current) {
      astro1Ref.current.classList.add("astronauta-float-1");
      setTimeout(() => {
        astro1Ref.current.classList.remove("astronauta-float-1");
      }, 4000); // Duración igual a la animación
    }
  };

  return (
    <div className="homepage-container">
      {/* Banner principal */}
      <section className="banner-section">
        <header>
          <h1>De la Visión a la Realidad</h1>
          <p>
            Te damos la bienvenida a <span>Bukialo</span>, tu asistente
            inteligente para la gestión de turnos. Automatizá la reserva de
            citas con nuestro Agente IA por WhatsApp y mantené tu agenda
            sincronizada en Google Calendar. Desde tu cuenta podrás activar o
            desactivar el bot y administrar tu número de contacto.
            <br />
            Probalo<span> gratis por 30 días</span> y descubrí cómo simplificar
            tu gestión de turnos.
          </p>
          <button>Quiero recibir más información</button>
        </header>
      </section>

      {/* Sección con imagen y texto */}
      <section className="feature-section">
        <div className="feature-img-container">
          <img
            src={astronauta}
            alt="Astronauta Bukialo"
            className="feature-img"
            ref={astro1Ref}
            onClick={handleAstro1Click}
          />
        </div>
        <div className="feature-text">
          <h2>
            <span className="feature-title-highlight">
              Conocé nuestros planes
            </span>
          </h2>
        </div>
      </section>

      {/* Cards */}
      <div className="cards-astro2-wrapper">
        <CardList />
        <div className="astro2-container">
          <img
            src={astronauta2}
            alt="Astronauta Bukialo 2"
            className="astronauta2-img"
            ref={astroRef}
            onClick={handleAstro2Click}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;