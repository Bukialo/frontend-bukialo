import React from "react";
import "./ModalCustom.css";

const ModalCustom = ({ open, onClose, title, image, message }) => {
  if (!open) return null;
  return (
    <div className="modal-custom-backdrop" onClick={onClose}>
      <div className="modal-custom-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-custom-title">{title}</h2>
        <img src={image} alt="modal" className="modal-custom-img" />
        <p className="modal-custom-message">{message}</p>
      </div>
    </div>
  );
};

export default ModalCustom;
