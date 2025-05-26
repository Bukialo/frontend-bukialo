import "./Cards.css";

const CardList = () => {
  const plans = [
    {
      title: "Plan Basic",
      anual: {
        key: 1,
        price: 144000,
        label: "ARS/año",
        discount: "Ahorrá el 20%",
      },
      semestral: {
        key: 2,
        price: 81000,
        label: "ARS/6 meses",
        discount: "Ahorrá el 10%",
      },
      mensual: {
        key: 3,
        price: 15000,
        label: "ARS/mes",
      },
      features: ["Acceso básico", "Soporte estándar 9 a 18"],
    },
    {
      title: "Plan Medium",
      anual: {
        key: 4,
        price: 288000,
        label: "ARS/año",
        discount: "Ahorrá el 20%",
      },
      semestral: {
        key: 5,
        price: 162000,
        label: "ARS/6 meses",
        discount: "Ahorrá el 10%",
      },
      mensual: {
        key: 6,
        price: 30000,
        label: "ARS/mes",
      },
      features: [
        "Soporte estándar 9 a 18",
        "Recordatorio turnos usuarios",
        "Confirmación 24 horas antes",
      ],
    },
    {
      title: "Plan Premium",
      anual: {
        key: 7,
        price: 432000,
        label: "ARS/año",
        discount: "Ahorrá el 20%",
      },
      semestral: {
        key: 8,
        price: 243000,
        label: "ARS/6 meses",
        discount: "Ahorrá el 10%",
      },
      mensual: {
        key: 9,
        price: 45000,
        label: "ARS/mes",
      },
      features: [
        "Soporte 24/7",
        "Recordatorio turnos usuarios",
        "Confirmación 48 horas antes",
      ],
    },
    {
      title: "Plan Enterprise",
      features: ["Agente IA de acuerdo a tus necesidades"],
      contactForm: true,
    },
  ];

  return (
    <div className="cards-section">
      {plans.map((plan) => (
        <div className="info-card" key={plan.title}>
          <h3>{plan.title}</h3>
          <div className="info-card-content">
            {plan.anual && (
              <div className="price-row">
                <p className="price-label">Anual</p>
                <p className="price-value year">
                  {plan.anual.price.toLocaleString("es-AR")} {plan.anual.label}
                  {plan.anual.discount && (
                    <span className="price-discount">
                      {plan.anual.discount}
                    </span>
                  )}
                </p>
              </div>
            )}

            {plan.semestral && (
              <div className="price-row">
                <p className="price-label">Semestral</p>
                <p className="price-value">
                  {plan.semestral.price.toLocaleString("es-AR")}{" "}
                  {plan.semestral.label}
                  {plan.semestral.discount && (
                    <span className="price-discount">
                      {plan.semestral.discount}
                    </span>
                  )}
                </p>
              </div>
            )}

            {plan.mensual && (
              <div className="price-row">
                <p className="price-label">Mensual</p>
                <p className="price-value month">
                  {plan.mensual.price.toLocaleString("es-AR")}{" "}
                  {plan.mensual.label}
                </p>
              </div>
            )}

            {plan.features && (
              <>
                <hr className="divider" />
                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
