import { update, text, Ok, Err, Result, query, bool, StableBTreeMap } from "azle";
import { ErrorResponse } from "./models/error";

const usernameStorage = StableBTreeMap(text, text, 3);

class User {
  // Method to update a user's username
  updateUsername() {
    return update(
      [text, text],
      Result(text, ErrorResponse),
      async (userIdentity, newUsername) => {
        if (!userIdentity || !newUsername) {
          return Err({
            error: { message: "userIdentity and newUsername cannot be empty" },
          });
        }

        // Check if the new username already exists
        if (this.usernameExists(newUsername)) {
          return Err({
            error: { message: "Username already exists" },
          });
        }

        // Remove the old username, if it exists
        const oldUsername = usernameStorage.get(userIdentity);
        if ("Some" in oldUsername) {
          usernameStorage.remove(userIdentity);
        }

        usernameStorage.insert(userIdentity, newUsername);
        return Ok(newUsername);
      }
    );
  }

  // Method to retrieve a user's username
  getUsername() {
    return query(
      [text],
      Result(text, ErrorResponse),
      async (userIdentity) => {
        if (!userIdentity) {
          return Err({ error: { message: "userIdentity cannot be empty" } });
        }

        const username = usernameStorage.get(userIdentity);
        if ("None" in username) {
          return Err({ error: { message: `No username found for ${userIdentity}` } });
        }

        return Ok(username.Some);
      }
    );
  }

  // Method to check if a username exists
  usernameExists(username: string) {
    const entries = usernameStorage.entries();
    for (let i = 0; i < entries.len(); i++) {
      const [_, value] = entries.get(i);
      if (value === username) {
        return true;
      }
    }
    return false;
  }

  // Additional method to remove a user's username
  removeUsername() {
    return update(
      [text],
      Result(bool, ErrorResponse),
      async (userIdentity) => {
        if (!userIdentity) {
          return Err({ error: { message: "userIdentity cannot be empty" } });
        }

        const username = usernameStorage.get(userIdentity);
        if ("None" in username) {
          return Err({ error: { message: `No username found for ${userIdentity}` } });
        }

        usernameStorage.remove(userIdentity);
        return Ok(true);
      }
    );
  }
}

const user = new User();
export default user;