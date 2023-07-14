import { SessionStrategy } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string
          password: string
        }
        // TODO: Validate credentials on API

        if (!username || !password) return null

        return {
          id: 'user-1',
          name: 'John Doe',
          email: 'johndoe@mail.com',
          token: 'access-token',
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
  pages: {
    // signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      return { ...token, ...user }
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token
      return session
    },
  },
}

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }
