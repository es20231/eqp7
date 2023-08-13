import { ImageSchema } from './image.schema'

const PostSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    userId: { type: 'string' },
    subtitle: { type: 'string' },
    imageId: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    image: ImageSchema,
    user: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        fullName: { type: 'string' },
      },
    },
  },
}

const getPostsSchema = {
  tags: ['post'],
  type: 'object',
  security: [{ bearer: [] }],
  response: {
    200: {
      type: 'object',
      description: 'Get posts successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: PostSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get posts failed',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      description: 'Unauthorized',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}
const getPostByIdSchema = {
  tags: ['post'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get post by id successful',
      properties: {
        message: { type: 'string' },
        payload: PostSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Get post by id failed',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      description: 'Unauthorized',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}
const getPostsByUserIdSchema = {
  tags: ['post'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get posts by user id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: PostSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get posts by user id failed',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      description: 'Unauthorized',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}
const createPostSchema = {
  tags: ['post'],
  type: 'object',
  security: [{ bearer: [] }],
  body: {
    type: 'object',
    properties: {
      subtitle: { type: 'string' },
      imageId: { type: 'string' },
      userId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Create post successful',
      properties: {
        message: { type: 'string' },
        payload: PostSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Create post failed',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      description: 'Unauthorized',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}
const updatePostSchema = {
  tags: ['post'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      subtitle: { type: 'string' },
      imageId: { type: 'string' },
      userId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Update post successful',
      properties: {
        message: { type: 'string' },
        payload: PostSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Update post failed',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      description: 'Unauthorized',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}
const deletePostSchema = {
  tags: ['post'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Delete post successful',
      properties: {
        message: { type: 'string' },
        payload: PostSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Delete post failed',
      properties: {
        message: { type: 'string' },
      },
    },
    401: {
      type: 'object',
      description: 'Unauthorized',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

export {
  PostSchema,
  createPostSchema,
  deletePostSchema,
  getPostByIdSchema,
  getPostsByUserIdSchema,
  getPostsSchema,
  updatePostSchema,
}
