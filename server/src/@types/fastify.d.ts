import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string
      username: string
      email: string
      iat: number
      exp: number
    }
  }
}
