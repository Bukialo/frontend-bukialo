import "./Dashboard.css";
import CreateInstance from "../../components/createInstance/CreateInstance.jsx";
import { useAuth } from "../../authContext/authContext.jsx";

const Dashboard = () => {
  const { token, userData } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="welcome-box">
        <h1 className="welcome-title">
          Bienvenido {userData.name || "Usuario"}
        </h1>
        <p className="subtitle">
          Te damos la bienvenida a Bukialo, tu asistente inteligente de gestión
          de turnos. Automatizá tus citas con nuestro Agente IA por WhatsApp,
          con agendado directo en Google Calendar. Desde tu cuenta podrás
          activar o desactivar el bot y administrar tu número de contacto.
        </p>
        <button className="submit-button">Probalo gratis por 30 dias</button>
      </div>

      {token && userData?.status === "approved" && <CreateInstance />}
    </div>
  );
};

export default Dashboard;
