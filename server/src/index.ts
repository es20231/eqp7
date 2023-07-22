import Fastify from "fastify";
import { PostRoutes } from "./routes/post.routes";
import { UserRoutes } from "./routes/user.routes";

async function bootstrap() {
  const fastify = Fastify({ logger: true });

  fastify.register(UserRoutes);
  fastify.register(PostRoutes);

  fastify.get("/", async () => {
    return { message: "Welcome to MinIG API" };
  });

  await fastify.listen({ port: 3333 });
}

bootstrap();
