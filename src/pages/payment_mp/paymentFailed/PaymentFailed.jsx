import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../PaymentStatus.css";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div
        className="welcome-box"
        style={{ background: "linear-gradient(145deg, #4a1c1c, #2d0e0e)" }}
      >
        <h1
          className="welcome-title"
          style={{ background: "linear-gradient(135deg, #e74c3c, #ff7675)" }}
        >
          Pago Fallido
        </h1>
        <p className="welcome-subtitle">
          No se pudo procesar tu pago. Serás redirigido para intentarlo
          nuevamente.
        </p>
        <div className="payment-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e74c3c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
