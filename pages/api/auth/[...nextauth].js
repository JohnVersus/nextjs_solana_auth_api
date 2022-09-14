import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import Moralis from "moralis";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const { message, signature } = credentials;
          await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

          const { address, network, profileId, expirationTime } = (
            await Moralis.Auth.verify({ message, signature, network: "solana" })
          ).raw;
          const user = {
            address,
            network,
            profileId,
            expirationTime,
          };
          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
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
