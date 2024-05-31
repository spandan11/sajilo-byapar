import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/server/db";
import bcrypt from "bcrypt";
import { type USER_ROLE } from "@prisma/client";
import { type DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    storeId: string;
    userRole: USER_ROLE;
  }
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      storeId: string;
      userRole: USER_ROLE;
      // ...other properties
    } & DefaultSession["user"];
  }

  interface User {
    storeId: string;
    userRole: USER_ROLE;
    // ...other properties
  }
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ user, token }) => {
      if (user) {
        token.id = user.id;
        token.userRole = user.userRole;
        token.storeId = user.storeId;
      }
      return token;
    },
    session: ({ token, session }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        storeId: token.storeId,
        userRole: token.userRole,
      },
    }),
  },
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/sign-in",
  },
  debug: env.NODE_ENV === "development",
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password Required");
          }
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
          if (!user?.password) {
            throw new Error("Email doesn't exist");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }
          const userStore = await db.store.findFirst({
            where: {
              ownerId: user.id,
            },
          });
          return {
            id: user.id,
            name: user.fullName,
            email: user.email,
            storeId: userStore?.id as string,
            userRole: user.role,
          };
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
