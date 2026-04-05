import { createAuthClient } from "better-auth/react";

// No baseURL set — Better Auth will use window.location.origin automatically.
// This ensures auth requests always go to the same origin the user is on
// (whether www.oasisofarabic.com or oasisofarabic.com), preventing CORS errors.
export const authClient = createAuthClient();
