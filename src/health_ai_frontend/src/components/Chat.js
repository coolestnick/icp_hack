import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Loading from "./Loading";
import { login, logout } from "../utils/auth";
import toast from "react-hot-toast";
import { useAssistant } from "../context/HealthAiProvider";
import {
  analyseConversationSteps,
  createPatientQuery,
  getConversationHistory,
  initiateAssistantSession,
} from "../utils/conversation";
import { usePatient } from "../context/PatientProvider";
import "./Chat.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Chat() {
  const [query, setQuery] = useState("");
  const { patientDetails } = usePatient();
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionModalOpened, setSessionModalOpened] = useState(false);
  const { assistant, conversationThread } = useAssistant();
  const location = useLocation();
  const navigate = useNavigate();

  const updateConversation = async () => {
    if (
      window.auth.principalText &&
      window.auth.isAuthenticated &&
      conversationThread?.id
    ) {
      const messages = await getConversationHistory(conversationThread.id);
      setConversation(messages);
    }
  };

  const handleQuerySubmit = async (event) => {
    event.preventDefault();
    if (!window.auth.isAuthenticated) {
      toast.error("You are not authenticated");
      return;
    }

    if (!assistant?.id) {
      toast.error("You need to add an assistant first");
      return;
    }

    if (!conversationThread?.id || !assistant?.id) {
      console.log("Cannot create a query without a conversation thread or an assistant");
      return;
    }

    if (!query) return;

    const queryToSend = { content: query, role: "patient" };
    setConversation((prev) => [queryToSend, ...prev]);
    setLoading(true);
    await createPatientQuery(conversationThread.id, queryToSend);
    setQuery("");
    const sessionRunId = await initiateAssistantSession(conversationThread.id, assistant.id);
    const isSessionCompleted = await analyseConversationSteps(conversationThread.id, sessionRunId);
    if (isSessionCompleted) {
      await updateConversation();
      setLoading(false);
    }
  };

  useEffect(() => {
    updateConversation();
  }, [window.auth.principalText, window.auth.isAuthenticated, conversationThread?.id]);

  return (
    <div className="chat-wrapper">
      {/* Session modal and other UI components */}
      <div className="chat-container">
        {/* Conversation display */}
        <div className="conversation">
          {conversation
            .map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.role === "patient" ? "patient" : "assistant"
                }`}
              >
                {message.content}
              </div>
            ))
            .reverse()}
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
      </div>
    </div>
  );
}

// Assuming your project setup includes a root element with the id 'root'
//ReactDOM.render(<Chat />, document.getElementById("root"));
