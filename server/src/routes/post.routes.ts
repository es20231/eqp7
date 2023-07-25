import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { PostController } from '../controllers/post.controller'

const PostRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  fastify.get('/posts', options, PostController.getPosts)
  fastify.get('/posts/:id', options, PostController.getPostById)
  fastify.get('/posts/user/:userId', options, PostController.getPostsByUserId)
  fastify.post('/posts', options, PostController.createPost)
  fastify.patch('/posts/:id', options, PostController.updatePost)
  fastify.delete('/posts/:id', options, PostController.deletePost)
  done()
}

export { PostRoutes }
