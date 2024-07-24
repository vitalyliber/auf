// Auf server communication token
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

// Auf API token name
export const tokenName = "api_auth_token";

// Client auf token
// Use it for securely getting user info on the client / backend
// Encrypted and can't be compromised
export const internalTokenName = "internal_auth_token";

export const temporaryTokenName = "temporary_auth_token";

export const productionAppUrl = "https://auf.casply.com";

export const appUrl = productionAppUrl || "http://localhost:3000";

export const adminAppName = "auf"

export const onlineAtCookieName = "online_at_cookie_name";
