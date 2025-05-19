import { useState } from "react";
import axios from "axios";
import "./ButtonsQrInstance.css";
import { useNavigate } from "react-router-dom";

const QrButtons = () => {
  const [loading, setLoading] = useState({
    check: false,
    delete: false,
  });

  const navigate = useNavigate();

  const handleCheckQr = async () => {
    setLoading((prev) => ({ ...prev, check: true }));
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      const response = await axios.get(
        "http://localhost:8000/evolution/checkQrIsScanned",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === "open") {
        alert("QR escaneado correctamente");
        navigate("/dashboard");
      }

      if (response.data.status === "connecting") {
        alert("QR NO escaneado correctamente");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading((prev) => ({ ...prev, check: false }));
    }
  };

  const handleDeleteInstance = async () => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      const response = await axios.delete(
        "http://localhost:8000/evolution/deleteInstance",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data);

      if (response.data.status === "SUCCESS") {
        alert("Instancia eliminada");
        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <div className="qr-buttons-container">
      <button
        className="qr-button green-button"
        onClick={handleCheckQr}
        disabled={loading.check}
      >
        {loading.check ? "Verificando..." : "Ya escaneé el QR"}
      </button>

      <button
        className="qr-button red-button"
        onClick={handleDeleteInstance}
        disabled={loading.delete}
      >
        {loading.delete ? "Eliminando..." : "Eliminar instancia"}
      </button>
    </div>
  );
};

export default QrButtons;
