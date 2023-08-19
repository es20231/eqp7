
const commentSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    content: { type: 'string' },
    userId: { type: 'string' },
    postId: { type: 'string' },
    user: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        profilePicture: { type: 'string' },
      },
    },
    post: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
    },
  },
}

const getCommentsByPostIdSchema = {
  tags: ['comment'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      take: { type: 'number' },
      skip: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get comments by post id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: commentSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get comments by post id failed',
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

const getCommentsByUserIdSchema = {
  tags: ['comment'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      take: { type: 'number' },
      skip: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get comments by user id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: commentSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get comments by user id failed',
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

const getCommentByIdSchema = {
  tags: ['comment'],
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
      description: 'Get comment by id successful',
      properties: {
        message: { type: 'string' },
        payload: commentSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Get comment by id failed',
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

const getCommentsSchema = {
  tags: ['comment'],
  type: 'object',
  security: [{ bearer: [] }],
  querystring: {
    type: 'object',
    properties: {
      take: { type: 'number' },
      skip: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get comments successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: commentSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get comments failed',
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

const createCommentSchema = {
  tags: ['comment'],
  type: 'object',
  security: [{ bearer: [] }],
  body: {
    type: 'object',
    properties: {
      content: { type: 'string' },
      userId: { type: 'string' },
      postId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Create comment successful',
      properties: {
        message: { type: 'string' },
        payload: commentSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Create comment failed',
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

const deleteCommentSchema = {
  tags: ['comment'],
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
      description: 'Delete comment successful',
      properties: {
        message: { type: 'string' },
        payload: commentSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Delete comment failed',
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
  commentSchema,
  createCommentSchema,
  deleteCommentSchema,
  getCommentByIdSchema,
  getCommentsByPostIdSchema,
  getCommentsByUserIdSchema,
  getCommentsSchema
}

