import React, { createContext, useContext, useState, useEffect } from "react";
import { getAssistantDetails, createConversationThread, checkForSavedThread } from "../utils/healthAiCanister";

const HealthAiContext = createContext();
export const useHealthAi = () => useContext(HealthAiContext);

const HealthAiProvider = ({ children }) => {
  const [healthAssistant, setHealthAssistant] = useState(null);
  const [healthThread, setHealthThread] = useState(null);

  const loadAssistant = async () => {
    try {
      // Assuming getAssistantDetails corresponds to getAssistant backend method
      const data = await getAssistantDetails(); 
      console.log(data);
      setHealthAssistant(data);
    } catch (e) {
      console.log(e);
    }
  };

  const initiateThread = async () => {
    try {
      // Assuming createConversationThread corresponds to saveThread backend method
      const threadExists = await checkForSavedThread(window.auth.principalText);
      if (!threadExists) {
        const threadData = await createConversationThread(window.auth.principalText);
        setHealthThread(threadData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (window.auth.principalText && window.auth.isAuthenticated) {
      loadAssistant();
    }
  }, [window.auth.principalText]);

  useEffect(() => {
    if (window.auth.principalText && window.auth.isAuthenticated) {
      initiateThread();
    }
  }, [window.auth.principalText, healthAssistant]);

  return (
    <HealthAiContext.Provider
      value={{ healthAssistant, setHealthAssistant, healthThread, setHealthThread }}
    >
      {children}
    </HealthAiContext.Provider>
  );
};

export default HealthAiProvider;
