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
          image: '',
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
    async session({ session, token }: { token: any; session: any }) {
      session.token = token.user.token
      return session
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
}

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }
