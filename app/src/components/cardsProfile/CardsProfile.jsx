import React, { useState } from "react";
import "./CardsProfile.css";

const plans = [
  {
    key: "basico",
    title: "Plan Básico",
    anual: {
      price: 60000,
      label: "ARS/año",
      discount: "Ahorrá el 50%",
    },
    mensual: {
      price: 10000,
      label: "ARS/mes",
    },
    features: [
      "Acceso básico.",
      "Soporte estándar.",
      "1 usuario.",
    ],
  },
  {
    key: "premium",
    title: "Plan Premium",
    anual: {
      price: 120000,
      label: "ARS/año",
      discount: "Ahorrá el 50%",
    },
    mensual: {
      price: 20000,
      label: "ARS/mes",
    },
    features: [
      "Acceso completo.",
      "Soporte prioritario.",
      "5 usuarios.",
      "Funciones avanzadas.",
    ],
  },
  {
    key: "empresarial",
    title: "Plan Empresarial",
    anual: {
      price: 180000,
      label: "ARS/año",
      discount: "Ahorrá el 50%",
    },
    mensual: {
      price: 30000,
      label: "ARS/mes",
    },
    features: [
      "Acceso ilimitado.",
      "Soporte 24/7.",
      "Usuarios ilimitados.",
      "Funciones premium.",
    ],
  },
];

const CardsProfile = () => {
  // Estado para el plan y periodo seleccionado
  const [selected, setSelected] = useState({
    plan: plans[0].key,
    period: "anual",
  });

  const handleSelect = (planKey, period) => {
    setSelected({ plan: planKey, period });
  };

  return (
    <div className="cards-profile-section cards-profile-multi">
      {plans.map((plan) => (
        <div className="card-profile-gradient" key={plan.key}>
          <h3 className="card-profile-title">{plan.title}</h3>
          <div className="card-profile-content">
            <div className="card-profile-toggle">
              <label className="card-profile-radio">
                <input
                  type="radio"
                  name={`plan-profile-${plan.key}`}
                  checked={selected.plan === plan.key && selected.period === "anual"}
                  onChange={() => handleSelect(plan.key, "anual")}
                />
                <span className="card-profile-custom-radio anual"></span>
                <span className="card-profile-label">Anual</span>
              </label>
              <div className="card-profile-price-group">
                <span className="card-profile-price-bold">
                  {plan.anual.price.toLocaleString()}{" "}
                  <span className="card-profile-currency">{plan.anual.label}</span>
                </span>
                <span className="card-profile-discount">{plan.anual.discount}</span>
              </div>
            </div>
            <div className="card-profile-toggle">
              <label className="card-profile-radio">
                <input
                  type="radio"
                  name={`plan-profile-${plan.key}`}
                  checked={selected.plan === plan.key && selected.period === "mensual"}
                  onChange={() => handleSelect(plan.key, "mensual")}
                />
                <span className="card-profile-custom-radio mensual"></span>
                <span className="card-profile-label">Mensual</span>
              </label>
              <div className="card-profile-price-group">
                <span className="card-profile-price-bold card-profile-price-mes">
                  {plan.mensual.price.toLocaleString()}{" "}
                  <span className="card-profile-currency">{plan.mensual.label}</span>
                </span>
              </div>
            </div>
            <hr className="card-profile-divider" />
            <ul className="card-profile-features-list">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="card-profile-checkmark"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <button className="card-profile-btn">Obtener plan</button>
        </div>
      ))}
    </div>
  );
};

export default CardsProfile;