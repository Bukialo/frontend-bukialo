import { useState, useEffect } from "react";
import axios from "axios";
import "./CreateInstance.css";
import QrButtons from "../../common/buttonsQrInstance/ButtonsQrInstance.jsx";
import { useNavigate } from "react-router-dom";

const CreateInstance = () => {
  const [formData, setFormData] = useState({
    instanceName: "",
    number: "",
  });
  const [qrCode, setQrCode] = useState(null);
  const [pairingCode, setPairingCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [checkingInstance, setCheckingInstance] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCheckingInstance(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8000/evolution/checkIfInstanceExists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (response.data.exists === true && response.data.open === true) {
          alert("Ya tienes una instancia abierta");
          navigate("/dashboard");
          return;
        }

        if (response.data.exists && response.data.qrcode) {
          setQrCode(response.data.qrcode.base64);
          setPairingCode(response.data.qrcode.pairingCode);
          setShowForm(false);
        } else {
          setShowForm(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setShowForm(true);
      } finally {
        setCheckingInstance(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQrCode(null);
    setPairingCode(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró token de autenticación");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/evolution/createInstance",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.qrcode?.base64) {
        setQrCode(response.data.qrcode.base64);
        setPairingCode(response.data.qrcode.pairingCode);
        setShowForm(false);
      } else {
        setError("No se pudo generar tu código QR, contacta al administrador");
        setShowForm(true);
      }
    } catch (error) {
      setError(error.response ? error.response.data : { error: error.message });
      setShowForm(true);
    } finally {
      setLoading(false);
    }
  };

  if (checkingInstance) {
    return <div className="loading">Verificando instancia...</div>;
  }

  return (
    <div className="instance-container">
      {showForm ? (
        <form onSubmit={handleSubmit} className="instance-form">
          <div className="form-group">
            <label htmlFor="instanceName" className="form-label">
              Nombre empresa:
            </label>
            <input
              type="text"
              id="instanceName"
              name="instanceName"
              value={formData.instanceName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="number" className="form-label">
              Número de teléfono:
            </label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Enviando..." : "Crear"}
          </button>

          {error && !qrCode && (
            <div className="error-message">
              No se pudo generar tu código QR, contacta al administrador
            </div>
          )}
        </form>
      ) : (
        <div className="qr-container">
          <h3 className="qr-title">Escanea este código QR con WhatsApp</h3>
          <div className="qr-image-container">
            <img
              src={qrCode}
              alt="Código QR para vincular WhatsApp"
              className="qr-image"
            />
          </div>
          {pairingCode && (
            <div className="qr-pairing-code">
              Código de emparejamiento: {pairingCode}
            </div>
          )}
          <p className="qr-instructions">
            Abre WhatsApp en tu teléfono, toca Menú → Dispositivos vinculados →
            Vincular un dispositivo y escanea este código QR
          </p>
          <QrButtons></QrButtons>
        </div>
      )}

      {loading && <div className="loading">Cargando...</div>}

      {error && showForm && typeof error !== "string" && (
        <div className="error-container">
          <h3 className="error-title">Error:</h3>
          <pre className="error-content">{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateInstance;
