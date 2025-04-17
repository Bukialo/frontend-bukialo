import "./Dashboard.css";
import CreateInstance from "../../components/createInstance/CreateInstance.jsx";
import { useAuth } from "../../authContext/authContext.jsx";

const Dashboard = () => {
  const { token, userData } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="welcome-box">
        <h1 className="welcome-title">Bienvenido a Bookealo</h1>
        <p className="welcome-subtitle">Tu plataforma de reservas favorita</p>
      </div>
      {token && userData?.status === "approved" && <CreateInstance />}
    </div>
  );
};

export default Dashboard;
