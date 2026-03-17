import NextAuth from "next-auth";
import { authConfig } from "../auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
        async authorize(credentials) {
            // Validate the shape of incoming credentials
            const parsed = z.object({
                email: z.string().email(),
                password: z.string().min(1),
            }).safeParse(credentials);

            if (!parsed.success) return null;

            // Look up user in DB
            const user = await prisma.user.findUnique({
                where: { email: parsed.data.email },
            })

            // No user or user registered via Google (no password)
            if (!user || !user.password) return null;

            // Comapre submitted password against stored hash
            const valid = await bcrypt.compare(parsed.data.password, user.password);

            if (!valid) return null;

            return user;
        },
    }),
  ],
  callbacks: {
    // On first sign in, the user object is available - store id in token
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
        // Make id available on session.user in every component
        session.user.id = token.id as string;
        return session;
    }
  },
});