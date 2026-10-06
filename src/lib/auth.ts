import { betterAuth } from "better-auth";
import { emailOTP } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const client = new MongoClient(process.env.MONGODB_URL as string);
export const db = client.db("bangla-news-24");



export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },


    emailVerification: {
        autoSignInAfterVerification: true,
    },

    plugins: [
        emailOTP({
            overrideDefaultEmailVerification: true,
            sendVerificationOnSignUp: true,
            otpLength: 6,
            expiresIn: 300,

            async sendVerificationOTP({ email, otp, type }) {
                const subject =
                    type === "email-verification"
                        ? "Your verification code"
                        : "Your sign in code";

                const { error } = await resend.emails.send({
                    from: "Bangla News 24 <onboarding@resend.dev>",
                    to: email,
                    subject,
                    html: `
                        <div style="font-family:Arial,sans-serif;max-width:420px">
                            <p>Your verification code is:</p>
                            <h2 style="letter-spacing:8px;font-size:32px;margin:12px 0">${otp}</h2>
                            <p>This code expires in 5 minutes.</p>
                        </div>
                    `,
                });

                if (error) {
                    return;
                }
            },
        }),
    ],
});