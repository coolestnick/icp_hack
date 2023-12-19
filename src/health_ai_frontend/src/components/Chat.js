import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { login, logout } from "../utils/auth"; // Ensure this path is correct
import toast from "react-hot-toast";
import { useHealthAi } from "../context/HealthAiProvider"; // Make sure this is the correct path
import {
  analyseConversationSteps,
  createPatientQuery,
  getConversationHistory,
  initiateAssistantSession,
} from "../utils/conversation"; // Update paths if necessary
import { usePatient } from "../context/PatientProvider"; // Update paths if necessary
import "./Chat.css"; // Update paths if necessary

export default function Chat() {
  const [query, setQuery] = useState("");
  const { patientDetails } = usePatient();
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const { healthAssistant, healthThread } = useHealthAi();
  
  // Updates the conversation history
  const updateConversation = async () => {
    if (window.auth?.isAuthenticated && healthThread?.id) {
      try {
        const messages = await getConversationHistory(healthThread.id);
        setConversation(messages);
      } catch (error) {
        toast.error("Failed to load conversation history: " + error.message);
      }
    }
  };

  // Handles sending a new query
  const handleQuerySubmit = async (event) => {
    event.preventDefault();
    if (!window.auth?.isAuthenticated) {
      toast.error("You are not authenticated");
      return;
    }

    if (!healthAssistant?.id || !healthThread?.id) {
      toast.error("Assistant or conversation thread is missing");
      return;
    }

    if (!query) {
      toast.error("Please enter a query");
      return;
    }

    try {
      const queryToSend = { content: query, role: "patient" };
      setLoading(true);
      await createPatientQuery(healthThread.id, queryToSend);
      const sessionRunId = await initiateAssistantSession(healthThread.id, healthAssistant.id);
      const isSessionCompleted = await analyseConversationSteps(healthThread.id, sessionRunId);
      if (isSessionCompleted) {
        await updateConversation();
      }
      setQuery("");
    } catch (error) {
      toast.error("Failed to send query: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateConversation();
  }, [window.auth?.principalText, window.auth?.isAuthenticated, healthThread?.id]);

  // Add login and logout button handlers
  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div className="chat-wrapper">
      {/* Session modal and other UI components */}
      <div className="chat-container">
        {/* Conversation display */}
        <div className="conversation">
          {conversation.map((message, index) => (
            <div key={index} className={`message ${message.role === "patient" ? "patient" : "assistant"}`}>
              {message.content}
            </div>
          )).reverse()}
          {loading && <Loading />}
        </div>
        {/* Chat input field */}
        <div className="input-area">
          <input
            type="text"
            placeholder="Ask a health-related question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleQuerySubmit}>Send</button>
        </div>
        {/* Login/Logout button */}
        {!window.auth?.isAuthenticated ? (
          <button onClick={handleLogin} className="auth-button">
            Login
          </button>
        ) : (
          <button onClick={handleLogout} className="auth-button">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
