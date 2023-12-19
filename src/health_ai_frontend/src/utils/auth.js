import { AuthClient } from "@dfinity/auth-client";

const MAX_TTL = BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000);

// Use the INTERNET_IDENTITY_CANISTER_ID from your .env file
const IDENTITY_PROVIDER = `http://br5f7-7uaaa-aaaaa-qaaca-cai.localhost:8943/`;

export async function getAuthClient() {
  return await AuthClient.create();
}

export async function login() {
  const authClient = window.auth.client;

  const isAuthenticated = await authClient.isAuthenticated();

  if (!isAuthenticated) {
    await authClient?.login({
      maxTimeToLive: MAX_TTL,
      identityProvider: IDENTITY_PROVIDER,
      onSuccess: async () => {
        window.auth.isAuthenticated = await authClient.isAuthenticated();
        window.location.reload();
      },
    });
  }
}

export async function logout() {
  const authClient = window.auth.client;
  authClient.logout();
  window.location.reload();
}
