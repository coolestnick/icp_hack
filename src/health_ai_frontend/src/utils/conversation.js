// Import necessary dependencies and modules
import { Actor } from "@dfinity/agent";
import { idlFactory as healthAiBackendIdl } from "../../../declarations/health_ai_backend";
const HEALTH_AI_BACKEND_CANISTER_ID = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';


// Initialize the actor to interact with the backend canister
const backendActor = Actor.createActor(healthAiBackendIdl, {
  canisterId: HEALTH_AI_BACKEND_CANISTER_ID,
});

// Function to get the conversation thread
export const getConversationThread = async (userIdentity) => {
  try {
    return await backendActor.getThread(userIdentity);
  } catch (error) {
    console.error("Error in getConversationThread:", error);
    throw error;
  }
};

// Function to save a conversation thread
export const saveConversationThread = async (userIdentity, userInput) => {
  try {
    return await backendActor.saveThread(userIdentity, userInput);
  } catch (error) {
    console.error("Error in saveConversationThread:", error);
    throw error;
  }
};

// Function to delete a conversation thread
export const deleteConversationThread = async (userIdentity) => {
  try {
    return await backendActor.deleteThread(userIdentity);
  } catch (error) {
    console.error("Error in deleteConversationThread:", error);
    throw error;
  }
};

// Function to check if a thread exists for a user
export const hasSavedThread = async (userIdentity) => {
  try {
    return await backendActor.hasASavedThread(userIdentity);
  } catch (error) {
    console.error("Error in hasSavedThread:", error);
    throw error;
  }
};

