import fastifyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import Fastify from 'fastify'
import { AuthRoutes } from './routes/auth.routes'
import { CommentReactionRoutes } from './routes/comment-reaction.routes'
import { CommentRoutes } from './routes/comment.routes'
import { ImageRoutes } from './routes/image.routes'
import { PostReactionRoutes } from './routes/post-reaction.routes'
import { PostRoutes } from './routes/post.routes'
import { UserRoutes } from './routes/user.routes'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
    bodyLimit: 1024 * 1024 * 1, // 1mb
  })

  fastify.register(fastifyCors, {
    origin: ['http://localhost:3000', 'https://minigproject.vercel.app'],
  })

  fastify.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * 10, // 10mb
    },
    attachFieldsToBody: true,
    throwFileSizeLimit: true,
  })

  fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Documentation for MinIG API',
        description: 'MinIG API documentation',
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      tags: [
        { name: 'default', description: 'Default end-points' },
        { name: 'auth', description: 'Authentication related end-points' },
        { name: 'user', description: 'User related end-points' },
        { name: 'post', description: 'Post related end-points' },
        { name: 'image', description: 'Image related end-points' },
        { name: 'comment', description: 'Comment related end-points' },
        {
          name: 'comment-reaction',
          description: 'Comment reaction related end-points',
        },
        {
          name: 'post-reaction',
          description: 'Post reaction related end-points',
        },
      ],
      securityDefinitions: {
        bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description:
            'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".',
        },
      },
      host: 'localhost:3333',
      schemes: ['http'],
      consumes: ['application/json', 'multipart/form-data'],
      produces: ['application/json'],
    },
  })

  await fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next()
      },
      preHandler: function (request, reply, next) {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject
    },
    transformSpecificationClone: true,
  })

  fastify.register(UserRoutes)
  fastify.register(PostRoutes)
  fastify.register(ImageRoutes)
  fastify.register(AuthRoutes)
  fastify.register(CommentRoutes)
  fastify.register(CommentReactionRoutes)
  fastify.register(PostReactionRoutes)

  fastify.get('/', async () => {
    return {
      message: 'Welcome to MinIG API',
      tip: 'Use /docs to see documentation 📃',
    }
  })

  // fastify.get('/docs', async () => {
  //   return {
  //     message: 'Documentation is being built 🚧',
  //   }
  // })

  await fastify.listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3333,
  })
}

bootstrap()
