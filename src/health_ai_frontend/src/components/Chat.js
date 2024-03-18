import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import { login, logout } from "../utils/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  analyseConversationSteps,
  createPatientQuery,
  getConversationHistory,
  initiateAssistantSession,
} from "../utils/chat";
import { usePatient } from "../context/PatientProvider";
import { useHealthAi } from "../context/HealthAiProvider";
import "./Chat.css";

export default function Chat() {
  const [query, setQuery] = useState("");
  const { patientName, setPatientName } = usePatient();
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const { healthAssistant, healthThread } = useHealthAi();
  const navigate = useNavigate();

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

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="conversation">
          {conversation.map((message, index) => (
            <div key={index} className={`message ${message.role === "patient" ? "patient" : "assistant"}`}>
              {message.content}
            </div>
          )).reverse()}
          {loading && <Loading />}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Ask a health-related question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleQuerySubmit}>Send</button>
        </div>
        {!window.auth?.isAuthenticated ? (
          <button onClick={() => login()} className="auth-button">Login</button>
        ) : (
          <button onClick={() => logout()} className="auth-button">Logout</button>
        )}
      </div>
    </div>
  );
}
