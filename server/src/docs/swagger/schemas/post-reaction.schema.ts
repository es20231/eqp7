const postReactionSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    userId: { type: 'string' },
    postId: { type: 'string' },
    type: { type: 'string' },
    user: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        profilePicture: { type: 'string' },
      },
    },
  },
}

const getPostReactionsByPostIdSchema = {
  tags: ['post-reaction'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      postId: { type: 'string' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      type: { type: 'string' },
      take: { type: 'number' },
      skip: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get post reactions by post id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: postReactionSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get post reactions by post id failed',
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

const getPostReactionsAmountByPostIdSchema = {
  tags: ['post-reaction'],
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
      description: 'Get post reactions amount by post id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'object',
          properties: {
            postId: { type: 'string' },
            likes: { type: 'number' },
            dislikes: { type: 'number' },
          },
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get post reactions by post id failed',
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

const getPostReactionsByUserIdSchema = {
  tags: ['post-reaction'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      type: { type: 'string' },
      take: { type: 'number' },
      skip: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get post reactions by user id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: postReactionSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get post reactions by user id failed',
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

const getPostReactionByIdSchema = {
  tags: ['post-reaction'],
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
      description: 'Get post reaction by id successful',
      properties: {
        message: { type: 'string' },
        payload: postReactionSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Get post reaction by id failed',
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

const getPostReactionsSchema = {
  tags: ['post-reaction'],
  type: 'object',
  security: [{ bearer: [] }],
  querystring: {
    type: 'object',
    properties: {
      type: { type: 'string' },
      take: { type: 'number' },
      skip: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get post reactions successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: postReactionSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get post reactions failed',
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

const createPostReactionSchema = {
  tags: ['post-reaction'],
  type: 'object',
  security: [{ bearer: [] }],
  body: {
    type: 'object',
    properties: {
      postId: { type: 'string' },
      userId: { type: 'string' },
      type: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Create post reaction successful',
      properties: {
        message: { type: 'string' },
        payload: postReactionSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Create post reaction failed',
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

const deletePostReactionSchema = {
  tags: ['post-reaction'],
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
      description: 'Delete post reaction successful',
      properties: {
        message: { type: 'string' },
        payload: postReactionSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Delete post reaction failed',
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
  createPostReactionSchema,
  deletePostReactionSchema,
  getPostReactionByIdSchema,
  getPostReactionsAmountByPostIdSchema,
  getPostReactionsByPostIdSchema,
  getPostReactionsByUserIdSchema,
  getPostReactionsSchema,
  postReactionSchema,
}
