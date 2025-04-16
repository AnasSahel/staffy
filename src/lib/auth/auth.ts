import { db } from "@/db";
import { account, session, user, verification } from "@/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  plugins: [
    nextCookies(), // should be the last plugin in the array. It makes Set-Cookie work in Next.js
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: [
        "x-forwarded-for",
        "x-vercel-forwarded-for",
        "x-real-ip",
      ],
      disableIpTracking: false,
    },
    cookiePrefix: "ba-staffy",
  },
});
