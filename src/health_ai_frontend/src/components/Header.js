import React from "react";
import logo from "../assets/health/health1.jpg"; // Update the logo path as needed
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClicked = () => {
    navigate(`/`);
  };

  return (
    <header className="header">
      <div className="header-container" onClick={handleClicked}>
        <img className="logo" src={logo} alt="Health AI Icon" />
        <div className="title-container">
          <h1 className="title">
            Health<span style={{ color: "#0097da" }}>AI</span> Assistant
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
