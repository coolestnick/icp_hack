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
                    return Err({
                        error: { message: `No username found for ${userIdentity}` },
                    });
                }
                return Ok(username.Some);
            }
        );
    }

    // Additional method to check if a username exists for a given user identity
    hasUsername() {
        return query(
            [text],
            bool,
            async (userIdentity: any) => {
                return usernameStorage.has(userIdentity);
            }
        );
    }
}

const user = new User();
export default user;
