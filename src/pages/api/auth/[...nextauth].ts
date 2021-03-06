import { query as q } from "faunadb";
import NextAuth from "next-auth";
import { signIn } from "next-auth/client";
import Providers from "next-auth/providers";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
  ],

  jwt: {
    signingKey: process.env.JWT_SIGNING_KEY,
  },

  callbacks: {
    async signIn({ email }, account, profile) {
      try {
        await fauna.query(q.Create(q.Collection("users"), { data: { email } }));
        return true;
      } catch {
        return false;
      }
    },
  },
});
