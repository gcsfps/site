import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../src/lib/prisma';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são necessários');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || user.password !== credentials.password) {
          throw new Error('Email ou senha incorretos');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type,
          establishmentName: user.establishmentName,
          phone: user.phone,
          description: user.description,
          profileImage: user.profileImage,
          coverImage: user.coverImage,
          address: user.address,
          openingHours: user.openingHours,
          socialMedia: user.socialMedia,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.establishmentName = user.establishmentName;
        token.phone = user.phone;
        token.description = user.description;
        token.profileImage = user.profileImage;
        token.coverImage = user.coverImage;
        token.address = user.address;
        token.openingHours = user.openingHours;
        token.socialMedia = user.socialMedia;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          type: token.type,
          establishmentName: token.establishmentName,
          phone: token.phone,
          description: token.description,
          profileImage: token.profileImage,
          coverImage: token.coverImage,
          address: token.address,
          openingHours: token.openingHours,
          socialMedia: token.socialMedia,
        };
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
}

export default NextAuth(authOptions);
