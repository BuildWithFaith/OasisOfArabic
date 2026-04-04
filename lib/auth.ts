import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/config";
import * as schema from "../database/schema";
import { sendPasswordResetLink, sendVerificationOTP, generateOTP } from "./email";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false, // allow login without verification first
        sendResetPassword: async ({ user, url }) => {
            await sendPasswordResetLink(user.email, url, user.name);
        },
    },
    emailVerification: {
        sendOnSignUp: false, // We handle OTP manually via /api/auth/send-verification-otp
        sendVerificationEmail: async ({ user, url }) => {
            // Better Auth sends a link-based verification — use sendPasswordResetLink pattern
            // For OTP flow, we use our own /api/auth/send-verification-otp endpoint instead
            const otp = generateOTP();
            await sendVerificationOTP(user.email, otp, user.name);
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
