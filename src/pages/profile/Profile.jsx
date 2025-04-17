import { useState } from "react";
import "./Profile.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useAuth } from "../../authContext/authContext.jsx"; // Asegúrate de que la ruta sea correcta
import axios from "axios";

initMercadoPago("TEST-717b6537-8d42-49bc-b447-0b6a364065ee", {
  locale: "es-AR",
});

const customization = {
  texts: {
    action: "pay",
    valueProp: "security_details",
    title: "Paga con Mercado Pago",
  },
};

const Profile = () => {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showWallet, setShowWallet] = useState(false);

  const plans = [
    {
      type: "Plan Básico",
      price: 10000,
      features: ["Acceso básico", "Soporte estándar", "1 usuario"],
      backendValue: 1,
    },
    {
      type: "Plan Premium",
      price: 20000,
      features: [
        "Acceso completo",
        "Soporte prioritario",
        "5 usuarios",
        "Funciones avanzadas",
      ],
      backendValue: 2,
    },
    {
      type: "Plan Empresarial",
      price: 30000,
      features: [
        "Acceso ilimitado",
        "Soporte 24/7",
        "Usuarios ilimitados",
        "Funciones premium",
      ],
      backendValue: 3,
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowWallet(false);
  };

  const handleBuyPlan = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró token de autenticación");
      return;
    }

    if (!selectedPlan) {
      setError("Por favor selecciona un plan primero");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/payments/mp",
        {
          planType: selectedPlan.backendValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPreferenceId(response.data.preference_id);
      setShowWallet(true);
      setError(null);
    } catch (error) {
      console.error("Error creating preference:", error);
      setError("Error al procesar el pago");
      setShowWallet(false);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div className="profile-container">Cargando...</div>;
  }

  if (error) {
    return <div className="profile-container error">{error}</div>;
  }

  const isApproved = userData.status === "approved";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Hola {userData.full_name || "Usuario"}</h2>
        <div className="profile-info">
          <p>
            Estado de la cuenta:{" "}
            <span className={isApproved ? "active" : "inactive"}>
              {isApproved ? "ACTIVA" : "INACTIVA"}
            </span>
          </p>
          {isApproved && (
            <p>
              Plan actual: <strong>{userData.plan_type || "Sin plan"}</strong>
            </p>
          )}
        </div>
      </div>

      {!isApproved && (
        <>
          <h3>Selecciona un plan para activar tu cuenta</h3>
          <div className="plans-container">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`plan-card ${index === 1 ? "featured" : ""} ${
                  selectedPlan?.type === plan.type ? "selected" : ""
                }`}
              >
                <h3>{plan.type}</h3>
                <p className="plan-price">${plan.price.toFixed(2)}/mes</p>
                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <button
                  className="plan-button"
                  onClick={() => handleSelectPlan(plan)}
                >
                  Seleccionar
                </button>
              </div>
            ))}
          </div>

          {selectedPlan && (
            <div className="selected-plan-section">
              <div className="selected-plan-info">
                <p>
                  Plan seleccionado: <strong>{selectedPlan.type}</strong> - $
                  {selectedPlan.price.toFixed(2)}/mes
                </p>
                <button
                  className="buy-button"
                  onClick={handleBuyPlan}
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Comprar"}
                </button>
              </div>

              {showWallet && preferenceId && (
                <section className="pay-section">
                  <Wallet
                    customization={customization}
                    initialization={{ preferenceId, redirectMode: "self" }}
                  />
                </section>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
