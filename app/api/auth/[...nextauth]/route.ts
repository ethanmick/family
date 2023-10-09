import { prisma } from '@/lib/prisma'
import { Member } from '@prisma/client'
import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const member = await prisma.member.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!member || !member.password) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          member.password
        )

        if (!isPasswordValid) {
          return null
        }

        return member
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', session, token)
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          household: {
            id: token.householdId,
          },
        },
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user as unknown as Member
        return {
          ...token,
          id: u.id,
          household: {
            id: u.householdId,
          },
        }
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
