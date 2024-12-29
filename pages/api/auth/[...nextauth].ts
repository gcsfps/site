import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../src/lib/prisma';
import { compare } from 'bcryptjs';

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

        if (!user) {
          throw new Error('Email ou senha incorretos');
        }

        // Comparação com bcryptjs
        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) {
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
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
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
      if (session.user) {
        session.user.id = token.id;
        session.user.type = token.type;
        session.user.establishmentName = token.establishmentName;
        session.user.phone = token.phone;
        session.user.description = token.description;
        session.user.profileImage = token.profileImage;
        session.user.coverImage = token.coverImage;
        session.user.address = token.address;
        session.user.openingHours = token.openingHours;
        session.user.socialMedia = token.socialMedia;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('signOut') || url.includes('logout')) {
        return `${baseUrl}/login`;
      }
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 horas
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 horas
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
