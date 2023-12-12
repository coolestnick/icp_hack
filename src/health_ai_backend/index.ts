import { Canister, query, update } from "azle";
import assistant from "./assistant";
import user from "./user";
import { ASSISTANT_ID } from "../../../credential";

// Initialize the assistant ID
let assistantId: string = ASSISTANT_ID ?? "";

export default Canister({
    // Retrieve the assistant's ID
    getAssistant: query([], assistant.getAssistant(assistantId)),

    // User-related methods
    updateUsername: update([text, text], user.updateUsername()),
    getUsername: query([text], user.getUsername()),

    // Conversation thread management
    saveThread: update([text, text], assistant.saveThread()),
    getThread: query([text], assistant.getThread()),
    deleteThread: update([text], assistant.deleteThread()),
    hasASavedThread: query([text], assistant.hasASavedThread()),
});
