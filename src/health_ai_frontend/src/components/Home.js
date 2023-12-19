import React, { useEffect, useState } from "react";
import { Typography, Paper, Button } from "@mui/material";
import healthBackground from "../assets/health/health2.jpeg";
import "./home.css";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToChat = () => {
    navigate("/chat");
  };

  return (
    <>
      <div className="top-section">
        <div className="overlay-text">
          <Typography
            variant="h3"
            style={{
              color: "#edf3f6",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
            }}
          >
            <strong>
              Empowering Your Health with AI<span style={{ color: "#0097da" }}>n</span>novation
              <br />
              AI-Health Assistant: Your Digital Partner in Healthcare
            </strong>
          </Typography>
        </div>
        <img
          src={healthBackground}
          alt="Healthcare Background"
          className="top-image"
          style={{
            width: "100vw",
            height: "22vw",
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      </div>

      <div className="main-container">
        <Paper
          elevation={3}
          style={{
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            width: "350px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            <strong>Health AI Chatbot</strong>
          </Typography>
          <Typography
            variant="body2"
            style={{ padding: "0 16px", marginBottom: "8px" }}
          >
            <strong style={{ color: "#da7000" }}>
              Personalized Health Assistance
            </strong>
            at your fingertips. Discover AI-powered support for your health queries.
          </Typography>
          <div className="Buttons">
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "8px", backgroundColor: "#0097da" }}
              onClick={handleNavigateToChat}
            >
              Start Chat
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Home;
