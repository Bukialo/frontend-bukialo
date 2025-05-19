import React from "react";
import "./Cards.css";

const CardList = () => (
  <div className="cards-section">
    {/* Plan Básico */}
    <div className="info-card">
      <h3>Plan Básico</h3>
      <div className="info-card-content">
        <div className="price-row">
          <p className="price-label">Anual</p>
          <p className="price-value year">
            60.000 Ars/año<span className="price-discount">Ahorrá el 50%</span>
          </p>
        </div>
        <div className="price-row">
          <p className="price-label">Mensual</p>
          <p className="price-value month">10.000 Ars/mes</p>
        </div>
        <hr className="divider" />
        <ul>
          <li>Acceso básico.</li>
          <li>Soporte estándar.</li>
          <li>1 usuario.</li>
        </ul>
      </div>
    </div>
    {/* Plan Premium */}
    <div className="info-card">
      <h3>Plan Premium</h3>
      <div className="info-card-content">
        <div className="price-row">
          <p className="price-label">Anual</p>
          <p className="price-value year">
            120.000 Ars/año<span className="price-discount">Ahorrá el 50%</span>
          </p>
        </div>
        <div className="price-row">
          <span className="price-label">Mensual</span>
          <span className="price-value month">20.000 Ars/mes</span>
        </div>
        <hr className="divider" />
        <ul>
          <li>Acceso básico.</li>
          <li>Soporte estándar.</li>
          <li>1 usuario.</li>
          <li>Acceso a funciones premium.</li>
        </ul>
      </div>
    </div>
    {/* Plan Empresarial */}
    <div className="info-card">
      <h3>Plan Empresarial</h3>
      <div className="info-card-content">
        <div className="price-row">
          <p className="price-label">Anual</p>
          <p className="price-value year">
            240.000 Ars/año<span className="price-discount">Ahorrá el 50%</span>
          </p>
        </div>
        <div className="price-row">
          <span className="price-label">Mensual</span>
          <span className="price-value month">40.000 Ars/mes</span>
        </div>
        <hr className="divider" />
        <ul>
          <li>Acceso básico.</li>
          <li>Soporte estándar.</li>
          <li>1 usuario.</li>
          <li>Acceso a funciones personalizadas.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default CardList;
