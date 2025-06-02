import { useState } from "react";
import "./Profile.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useAuth } from "../../authContext/authContext.jsx";
import axios from "axios";
import CardsProfile from "../../components/cardsProfile/CardsProfile.jsx";

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
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
    console.log(typeof selectedPlan.backendValue);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/mp`,
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
        <h2 className="profile-title">
          Hola {userData.full_name || "Usuario"}
        </h2>
        <div className="profile-info">
          <p>
            Estado de la cuenta:{" "}
            <span className={isApproved ? "active" : "inactive"}>
              {isApproved
                ? "Tu cuenta está Activa"
                : "Tu cuenta está Desactivada"}
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
          <h2>Selecciona un plan para activar tu cuenta</h2>
          <CardsProfile
            onSelectPlan={handleSelectPlan}
            selectedPlan={selectedPlan}
          />

          {selectedPlan && (
            <div className="selected-plan-section">
              <div className="selected-plan-info">
                <p>
                  Plan seleccionado: <strong>{selectedPlan.type}</strong> - $
                  {selectedPlan.price?.toLocaleString("es-AR")} (
                  {selectedPlan.period})
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
