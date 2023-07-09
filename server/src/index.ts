import Fastify from "fastify";
import { UserRoutes } from "./routes/user.routes";

async function bootstrap() {
  const fastify = Fastify({logger: true})

  fastify.register(UserRoutes)

  await fastify.listen({ port: 3333 });
}

bootstrap();