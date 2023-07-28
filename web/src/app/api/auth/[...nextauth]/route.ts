import { api } from '@/services/axios'
import { UserInfo } from '@/stores/user.store'
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

        let user = undefined as UserInfo | undefined

        await api()
          .post('/auth/login', {
            username,
            password,
          })
          .then((response) => {
            console.log('response', response)

            user = {
              id: response.data.payload.user.id,
              fullName: response.data.payload.user.fullName,
              username: response.data.payload.user.username,
              email: response.data.payload.user.email,
              emailVerified: response.data.payload.user.emailVerified,
              profilePicture: response.data.payload.user.profilePicture,
              biography: response.data.payload.user.biography,
              token: response.data.payload.token,
            }
          })
          .catch((error) => {
            console.log('error', error)
          })

        if (user) {
          return user
        } else {
          return null
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
    signIn: '/auth/login',
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
