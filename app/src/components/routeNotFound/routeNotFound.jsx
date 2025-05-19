import { useNavigate } from "react-router-dom";
import CustomAlert from "../../common/customAlert/CustomAlert.jsx";
import { useState } from "react";

const RouteNotFound = () => {
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate("/");
  };

  return (
    <>
      {showAlert && (
        <CustomAlert message="404 ROUTE NOT FOUND" onClose={handleCloseAlert} />
      )}
    </>
  );
};

export default RouteNotFound;
