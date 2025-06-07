import "./CardsProfile.css";

const plans = [
  {
    title: "Plan Basic",
    pricingOptions: [
      {
        key: 1,
        type: "anual",
        price: 144000,
        label: "ARS/año",
        discount: "Ahorrá el 20%",
      },
      {
        key: 2,
        type: "semestral",
        price: 81000,
        label: "ARS/6 meses",
        discount: "Ahorrá el 10%",
      },
      {
        key: 3,
        type: "mensual",
        price: 15000,
        label: "ARS/mes",
      },
    ],
    features: ["Acceso básico", "Soporte estándar 9 a 18"],
  },
  {
    title: "Plan Medium",
    pricingOptions: [
      {
        key: 4,
        type: "anual",
        price: 288000,
        label: "ARS/año",
        discount: "Ahorrá el 20%",
      },
      {
        key: 5,
        type: "semestral",
        price: 162000,
        label: "ARS/6 meses",
        discount: "Ahorrá el 10%",
      },
      {
        key: 6,
        type: "mensual",
        price: 30000,
        label: "ARS/mes",
      },
    ],
    features: [
      "Soporte estándar 9 a 18",
      "Recordatorio turnos usuarios",
      "Confirmación 24 horas antes",
    ],
  },
  {
    title: "Plan Premium",
    pricingOptions: [
      {
        key: 7,
        type: "anual",
        price: 432000,
        label: "ARS/año",
        discount: "Ahorrá el 20%",
      },
      {
        key: 8,
        type: "semestral",
        price: 243000,
        label: "ARS/6 meses",
        discount: "Ahorrá el 10%",
      },
      {
        key: 9,
        type: "mensual",
        price: 45000,
        label: "ARS/mes",
      },
    ],
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

const CardsProfile = ({ onSelectPlan, selectedPlan }) => {
  const handleSelect = (planKey, period) => {
    const selectedPlanObj = plans.find((plan) =>
      plan.pricingOptions?.some((option) => option.key === planKey)
    );

    if (selectedPlanObj) {
      const priceData = selectedPlanObj.pricingOptions?.find(
        (option) => option.key === planKey
      );

      if (priceData) {
        onSelectPlan({
          type: selectedPlanObj.title,
          price: priceData.price || 0,
          backendValue: planKey,
          period: period,
        });
      }
    }
  };

  return (
    <div className="cards-profile-section cards-profile-multi">
      {plans.map((plan) => {
        const isSelected = plan.pricingOptions?.some(
          (option) => option.key === selectedPlan?.backendValue
        );

        return (
          <div
            className={`card-profile-gradient ${isSelected ? "selected" : ""}`}
            key={plan.title}
          >
            <h3 className="card-profile-title">{plan.title}</h3>
            <div className="card-profile-content">
              {plan.pricingOptions?.map((option) => (
                <div className="card-profile-toggle" key={option.key}>
                  <label className="card-profile-radio">
                    <input
                      type="radio"
                      name={`plan-profile-${option.key}`}
                      checked={
                        selectedPlan?.backendValue === option.key &&
                        selectedPlan?.period === option.type
                      }
                      onChange={() => handleSelect(option.key, option.type)}
                    />
                    <span
                      className={`card-profile-custom-radio ${option.type}`}
                    ></span>
                    <span className="card-profile-label">
                      {option.type.charAt(0).toUpperCase() +
                        option.type.slice(1)}
                    </span>
                  </label>
                  <div className="card-profile-price-group">
                    <span
                      className={`card-profile-price-bold ${
                        option.type === "mensual"
                          ? "card-profile-price-mes"
                          : ""
                      }`}
                    >
                      {option.price.toLocaleString()}{" "}
                      <span className="card-profile-currency">
                        {option.label}
                      </span>
                    </span>
                    {option.discount && (
                      <span className="card-profile-discount">
                        {option.discount}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {plan.features && (
                <>
                  <hr className="card-profile-divider" />
                  <ul className="card-profile-features-list">
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="card-profile-checkmark"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <button
              className="card-profile-btn"
              onClick={() => {
                const anualOption = plan.pricingOptions?.find(
                  (opt) => opt.type === "anual"
                );
                if (anualOption) {
                  handleSelect(anualOption.key, "anual");
                }
              }}
              disabled={plan.contactForm}
            >
              {plan.contactForm ? "Contactar" : "Obtener plan"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CardsProfile;
