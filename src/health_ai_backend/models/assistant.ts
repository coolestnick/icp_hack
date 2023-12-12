import { Record, text, nat64, Vec } from "azle";

// Define the ConversationEntryType
export type ConversationEntryType = {
    userInput: string;
    aiResponse: string;
};

// Define the Record for ConversationEntry
export const ConversationEntry = Record({
    userInput: text,
    aiResponse: text
});

// Define the ThreadType
export type ThreadType = {
    id: string;
    object: string;
    created_at: bigint;
    conversation: ConversationEntryType[];
};

// Define the Record for Thread
export const Thread = Record({
    id: text,
    object: text,
    created_at: nat64,
    conversation: Vec(ConversationEntry)
});
