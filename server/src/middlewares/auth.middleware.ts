import 'dotenv/config'
import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  username: string
  email: string
  iat: number
  exp: number
}

const authenticate = (
  request: FastifyRequest,
  reply: FastifyReply,
  next: any,
) => {
  const headerToken = request.headers.authorization

  if (!headerToken) {
    reply.status(401).send({
      message: 'Bearer token not found',
    })
    return
  }

  const [bearer, token] = headerToken.split(' ')

  const isFormated = bearer === 'Bearer' && token

  if (!isFormated) {
    reply.status(401).send({
      message: 'Badly formatted token',
    })
    return
  }

  const secret = process.env.JWT_SECRET

  if (!secret) {
    reply.status(500).send({
      message:
        'Internal server error. Environment variable JWT_SECRET not found',
    })
    return
  }

  jwt.verify(token, secret, (err: any, decoded) => {
    if (err)
      return reply.status(401).send({
        message: 'Invalid token',
      })

    request.user = (decoded as unknown as UserPayload) || undefined
    return next()
  })
}

export { authenticate }
