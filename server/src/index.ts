import Fastify from 'fastify'
import { ImageRoutes } from './routes/image.routes'
import { UserRoutes } from './routes/user.routes'
import { PostRoutes } from "./routes/post.routes";

async function bootstrap() {
  const fastify = Fastify({ logger: true });

  fastify.register(UserRoutes)
  fastify.register(ImageRoutes)
  fastify.register(PostRoutes)

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

  await fastify.listen({ port: 3333 });
}

bootstrap();
