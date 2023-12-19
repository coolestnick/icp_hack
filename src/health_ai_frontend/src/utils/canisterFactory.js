import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as healthAiBackendIdl } from "../../../declarations/health_ai_backend/health_ai_backend.did.js";

// Replace the hardcoded CHAT_CANISTER_ID with HEALTH_AI_BACKEND_CANISTER_ID from your .env file
const HEALTH_AI_BACKEND_CANISTER_ID = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

export async function getChatCanister() {
  return await getCanister(HEALTH_AI_BACKEND_CANISTER_ID, healthAiBackendIdl);
}

async function getCanister(canisterId, idl) {
  const authClient = window.auth.client;
  const agent = new HttpAgent({
    identity: authClient.getIdentity(),
  });
  await agent.fetchRootKey();
  return Actor.createActor(idl, {
    agent,
    canisterId,
  });
}

