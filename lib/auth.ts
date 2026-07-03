import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

// Vul in .env: ALLOWED_EMAILS=jij@example.com,partner@example.com
const allowedEmails = (process.env.ALLOWED_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.AUTH_EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      return allowedEmails.includes(user.email.toLowerCase());
    },
  },
  pages: {
    verifyRequest: "/inloggen/check-je-mail",
  },
});
