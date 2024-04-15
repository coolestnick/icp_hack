import { update, text, Ok, Err, Result, StableBTreeMap, query, bool } from "azle";
import { ErrorResponse } from "./models/error";
import { ThreadType, Thread, ConversationEntryType } from "./models/assistant";

// Use 'typeof' to refer to the types of the imported values
const threadStorage = StableBTreeMap(text, Thread, 4);

class Assistant {
  // Fetches the assistant's ID - placeholder for getting assistant details
  getAssistant(assistantId: string) {
    return query([], Result(text, ErrorResponse), () => {
      return Ok(assistantId);
    });
  }

  // Save or update a conversation thread
  saveThread() {
    return update(
      [text, text],
      Result(Thread, ErrorResponse),
      async (userIdentity, userInput) => {
        if (!userIdentity || !userInput) {
          return Err({ error: { message: "userIdentity and userInput cannot be empty" } });
        }

        // Placeholder for AI response - to be integrated
        let aiResponse = `AI Response for: ${userInput}`;

        // Create a new conversation entry
        let newEntry: ConversationEntryType = { userInput, aiResponse };

        let existingThread = threadStorage.get(userIdentity);
        let thread: ThreadType;

        if ("None" in existingThread) {
          thread = {
            id: userIdentity, // Assuming the thread ID is the userIdentity
            object: "Chat Thread",
            created_at: BigInt(Date.now()),
            conversation: [newEntry],
          };
        } else {
          thread = existingThread.Some;
          thread.conversation.push(newEntry);
        }

        threadStorage.insert(userIdentity, thread);
        return Ok(thread);
      }
    );
  }

  // Retrieve a conversation thread
  getThread() {
    return query(
      [text],
      Result(Thread, ErrorResponse),
      async (userIdentity) => {
        if (!userIdentity) {
          return Err({ error: { message: "userIdentity cannot be empty" } });
        }

        const thread = threadStorage.get(userIdentity);
        if ("None" in thread) {
          return Err({ error: { message: `No thread found for ${userIdentity}` } });
        }

        return Ok(thread.Some);
      }
    );
  }

  // Delete a conversation thread
  deleteThread() {
    return update([text], Result(text, ErrorResponse), async (userIdentity) => {
      if (!userIdentity) {
        return Err({ error: { message: "userIdentity cannot be empty" } });
      }

      const threadToDelete = threadStorage.get(userIdentity);
      if ("None" in threadToDelete) {
        return Err({ error: { message: `No thread found for ${userIdentity}` } });
      }

      threadStorage.remove(userIdentity);
      return Ok("Deleted");
    });
  }

  // Check if a thread exists for a user
  hasASavedThread() {
    return query([text], bool, async (userIdentity) => {
      const thread = threadStorage.get(userIdentity);
      return !("None" in thread);
    });
  }

  // Search for a conversation entry within a thread
  searchThreadByUserInput() {
    return query(
      [text, text],
      Result(ConversationEntryType | null, ErrorResponse),
      async (userIdentity, searchQuery) => {
        if (!userIdentity || !searchQuery) {
          return Err({ error: { message: "userIdentity and searchQuery cannot be empty" } });
        }

        const thread = threadStorage.get(userIdentity);
        if ("None" in thread) {
          return Err({ error: { message: `No thread found for ${userIdentity}` } });
        }

        const conversation = thread.Some.conversation;
        for (let i = 0; i < conversation.length; i++) {
          const entry = conversation[i];
          if (entry.userInput.includes(searchQuery)) {
            return Ok(entry);
          }
        }

        return Ok(null); // No matching entry found
      }
    );
  }
}

const assistant = new Assistant();
export default assistant;