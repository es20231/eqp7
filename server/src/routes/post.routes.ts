import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { PostController } from '../controllers/post.controller'
import { authenticate } from '../middlewares/auth.middleware'

const PostRoutes = (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: any,
) => {
  const optionsWithAuth = {
    ...options,
    preValidation: authenticate,
  }

  fastify.get('/posts', optionsWithAuth, PostController.getPosts)
  fastify.get('/posts/:id', optionsWithAuth, PostController.getPostById)
  fastify.get(
    '/posts/user/:userId',
    optionsWithAuth,
    PostController.getPostsByUserId,
  )
  fastify.post('/posts', optionsWithAuth, PostController.createPost)
  fastify.patch('/posts/:id', optionsWithAuth, PostController.updatePost)
  fastify.delete('/posts/:id', optionsWithAuth, PostController.deletePost)
  done()
}

export { PostRoutes }
