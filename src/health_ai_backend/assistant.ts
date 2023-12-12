import { update, text, Ok, Err, Result, StableBTreeMap, query, bool } from "azle";
import { ErrorResponse } from "./models/error";
import { Thread } from "./models/assistant";

// Assuming Thread model includes user input and AI response
const threadStorage = StableBTreeMap(text, Thread, 4);

class Assistant {
    // Fetches the assistant's ID - placeholder for getting assistant details
    getAssistant(assistantId: string) {
        return query([], Result(text, ErrorResponse), () => {
            return Ok(assistantId);
        });
    }

    // Save or update a conversation thread
    saveThread(userIdentity: string, userInput: string) {
        return update(
            [text, text],
            Result(Thread, ErrorResponse),
            async (userIdentity, userInput) => {
                if (!userIdentity || !userInput) {
                    return Err({
                        error: { message: "userIdentity and userInput can not be empty" },
                    });
                }

                // Placeholder for AI response - to be integrated
                let aiResponse = `AI Response for: ${userInput}`;

                let thread: Thread = {
                    userIdentity,
                    conversation: [{ userInput, aiResponse }]
                };

                // Update the thread if it exists
                const existingThread = threadStorage.get(userIdentity);
                if (!("None" in existingThread)) {
                    thread.conversation = [...existingThread.Some.conversation, { userInput, aiResponse }];
                }

                threadStorage.insert(userIdentity, thread);
                return Ok(thread);
            }
        );
    }

    // Retrieve a conversation thread
    getThread(userIdentity: string) {
        return query(
            [text],
            Result(Thread, ErrorResponse),
            async (userIdentity) => {
                if (!userIdentity) {
                    return Err({ error: { message: "userIdentity can not be empty" } });
                }

                const thread = threadStorage.get(userIdentity);
                if ("None" in thread) {
                    return Err({
                        error: { message: `No thread found for ${userIdentity}` },
                    });
                }

                return Ok(thread.Some);
            }
        );
    }

    // Delete a conversation thread
    deleteThread(userIdentity: string) {
        return update([text], Result(text, ErrorResponse), async (userIdentity) => {
            if (!userIdentity) {
                return Err({
                    error: { message: "userIdentity can not be empty" },
                });
            }

            const threadToDelete = threadStorage.get(userIdentity);
            if ("None" in threadToDelete) {
                return Err({
                    error: { message: `No thread found for ${userIdentity}` },
                });
            }

            threadStorage.remove(userIdentity);
            return Ok("Deleted");
        });
    }

    // Check if a thread exists for a user
    hasASavedThread(userIdentity: string) {
        return query([text], bool, async (userIdentity) => {
            const thread = threadStorage.get(userIdentity);
            return !("None" in thread);
        });
    }
}

const assistant = new Assistant();
export default assistant;
