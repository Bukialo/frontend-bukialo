import "./HomePage.css";
import React, { useRef } from "react";
import astronauta from "../../assets/astronauta.png";
/* import CardList from "../../components/cards/Cards"; */
import bukialoCrm from "../../assets/logo_bukialo.png";
import bukialoReservas from "../../assets/logo-buk-reservas.png";
import { Link } from "react-router-dom";
import bukialoAnalice from "../../assets/logo-feedback-analyze.png";

const HomePage = () => {
  const astro1Ref = useRef(null);

  // Animación para el astronauta de arriba
  const handleAstro1Click = () => {
    if (astro1Ref.current) {
      astro1Ref.current.classList.add("astronauta-float-1");
      setTimeout(() => {
        astro1Ref.current.classList.remove("astronauta-float-1");
      }, 4000);
    }
  };

  return (
    <div className="homepage-container">
      {/* Banner principal */}
      <section className="banner-section">
        <header>
          <h1>Agentes de IA que potencian tu negocio</h1>
          <p>
            Creamos agentes inteligentes de reservas para industrias como salud,
            turismo, logística y más, automatizando agendas a través de
            WhatsApp, web o redes sociales. Nuestras soluciones también se
            conectan con tus sistemas existentes <span>—como CRMs—</span> para
            explotar al máximo tus datos, optimizar procesos y ofrecer
            experiencias más inteligentes a tus clientes.
          </p>
          <div className="bukialo-logos">
            <Link to="/feedbackAnalize">
            <img src={bukialoAnalice} alt="Bukialo Analice" style={{ marginTop: "18px", height: "150px", objectFit: "contain", filter: "drop-shadow(0 2px 12px #28ddc1aa)", transition: "transform 0.2s" }} />
            </Link>
            <Link to="/reservas">
              <img src={bukialoReservas} alt="Bukialo Reservas" style={{ marginTop: "18px", height: "150px", objectFit: "contain", filter: "drop-shadow(0 2px 12px #28ddc1aa)", transition: "transform 0.2s" }} />
            </Link>
            <Link to="/crm">
              <img
                src={bukialoCrm}
                alt="Bukialo CRM"
                style={{
                  marginTop: "18px",
                  height: "150px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 12px #28ddc1aa)",
                  transition: "transform 0.2s",
                }}
                className="bukialo-crm-logo"
              />
            </Link>
          </div>
        </header>
      </section>

      {/* Astronauta 1 debajo del banner */}
      <div className="astronauta1-below-banner">
        <img
          src={astronauta}
          alt="Astronauta Bukialo"
          className="astronauta1-img"
          ref={astro1Ref}
          onClick={handleAstro1Click}
        />
      </div>
    </div>
  );
};

export default HomePage;