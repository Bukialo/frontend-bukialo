import React from "react";
import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa";
import "./BackLink.css";

const BackLink = ({ title, onClick }) => {
  return (
    <a
      className="link"
      href="#"
      onClick={onClick}
      title={title}
      style={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        gap: "5px",
        
      }}
    >
      <span className="icon">
        <FaArrowLeft style={{ marginRight: "8px", fontSize: "1.7em" }} />
      </span>
      <span className="text" style={{ fontSize: "1.18em", fontWeight: 500 }}>
        {title}
      </span>
    </a>
  );
};

BackLink.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BackLink;
