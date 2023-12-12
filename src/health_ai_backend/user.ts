import { update, text, Ok, Err, Result, query, bool } from "azle";
import { ErrorResponse } from "./models/error";

const usernameStorage = new Map<string, string>();

class User {
    // Method to update a user's username
    updateUsername(userIdentity: string, newUsername: string) {
        return update(
            [text, text],
            Result(text, ErrorResponse),
            async (userIdentity, newUsername) => {
                if (!userIdentity || !newUsername) {
                    return Err({
                        error: { message: "userIdentity and newUsername cannot be empty" },
                    });
                }

                usernameStorage.set(userIdentity, newUsername);
                return Ok(newUsername);
            }
        );
    }

    // Method to retrieve a user's username
    getUsername(userIdentity: string) {
        return query(
            [text],
            Result(text, ErrorResponse),
            async (userIdentity) => {
                if (!userIdentity) {
                    return Err({ error: { message: "userIdentity cannot be empty" } });
                }

                const username = usernameStorage.get(userIdentity);
                if (!username) {
                    return Err({
                        error: { message: `No username found for ${userIdentity}` },
                    });
                }

                return Ok(username);
            }
        );
    }

    // Method to check if a username exists for a given user identity
    hasUsername(userIdentity: string) {
        return query(
            [text],
            bool,
            async (userIdentity) => {
                return usernameStorage.has(userIdentity);
            }
        );
    }
}

const user = new User();
export default user;
