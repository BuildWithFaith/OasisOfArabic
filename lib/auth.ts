import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/config";
import * as schema from "../database/schema";
import { sendPasswordResetLink } from "./email";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.users,
            session: schema.sessions,
            account: schema.accounts,
            verification: schema.verifications,
        },
    }),
    // Allow both www and non-www (production) and localhost (development).
    trustedOrigins: [
        "https://oasisofarabic.com",
        "https://www.oasisofarabic.com",
        "http://localhost:3000",
    ],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // allow login without email verification
        sendResetPassword: async ({ user, url }) => {
            try {
                await sendPasswordResetLink(user.email, url, user.name);
            } catch (err) {
                console.error("[Auth] Failed to send password reset email:", err);
            }
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24,      // Refresh session if older than 1 day
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
            },
        },
    },
});

