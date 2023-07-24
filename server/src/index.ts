import Fastify from 'fastify'
import { AuthRoutes } from './routes/auth.routes'
import { ImageRoutes } from './routes/image.routes'
import { PostRoutes } from './routes/post.routes'
import { UserRoutes } from './routes/user.routes'
import fastifyCors = require('@fastify/cors')
import fastifyMultipart = require('@fastify/multipart')

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
    bodyLimit: 1024 * 1024 * 1, // 1mb
  })

  fastify.register(fastifyCors, {
    origin: ['http:localhost:3000', 'https://minigproject.vercel.app'],
  })

  fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * 10, // 10mb
    },
    attachFieldsToBody: true,
    throwFileSizeLimit: true,
  })

  fastify.register(UserRoutes)
  fastify.register(PostRoutes)
  fastify.register(ImageRoutes)
  fastify.register(AuthRoutes)

  fastify.get('/', async () => {
    return {
      message: 'Welcome to MinIG API',
      tip: 'Use /docs to see documentation 📃',
    }
  })

  fastify.get('/docs', async () => {
    return {
      message: 'Documentation is being built 🚧',
    }
  })

  await fastify.listen({ port: 3333 })
}

bootstrap()
