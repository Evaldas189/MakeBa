import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials) {

        const user = { name: credentials.email, email: credentials.email, role: credentials.role };
        console.log(user)
        return user
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
   
  ],
  pages: {
    signIn: "/auth/signin",
  },
});
