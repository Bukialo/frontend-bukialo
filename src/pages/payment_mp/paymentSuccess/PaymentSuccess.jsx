import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../authContext/authContext.jsx";
import "../PaymentStatus.css";

const baseUrl = import.meta.env.VITE_API_URL;

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { token, updateUserData } = useAuth();

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/user_status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        updateUserData({
          plan_type: response.data.plan_type,
          status: response.data.status,
        });
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    };

    if (token) {
      fetchUserStatus();
    }

    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="welcome-box">
        <h1 className="welcome-title">¡Pago Exitoso!</h1>
        <p className="welcome-subtitle">
          Tu plan ha sido activado correctamente. Serás redirigido al dashboard
          en breve.
        </p>
        <div className="payment-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
