import NextAuth from "next-auth";
import { MoralisNextAuthProvider } from "@moralisweb3/next";

export default NextAuth({
  providers: [MoralisNextAuthProvider()],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.expires = token.user.expirationTime;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
});
