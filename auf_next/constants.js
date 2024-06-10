// Auf server communication token
export const tokenName = "auth_token";

// Client auf token
// Use it for securely getting user info on the client / backend
// Encrypted and can't be compromised
export const internalTokenName = "internal_auth_token";

export const appUrl =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000`
    : `https://auf.casply.com`;
