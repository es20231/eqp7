const commentReactionSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    userId: { type: 'string' },
    commentId: { type: 'string' },
    type: { type: 'string' },
    user: {
      type: 'object',
      properties: {
        profilePicture: { type: 'string' },
        username: { type: 'string' },
      },
    },
  },
}

const getCommentReactionsByCommentIdSchema = {
  tags: ['comment-reaction'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      commentId: { type: 'string' },
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
      description: 'Get comment reactions by comment id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: commentReactionSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get comment reactions by comment id failed',
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

const getCommentReactionsAmountByCommentIdSchema = {
  tags: ['comment-reaction'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      commentId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get comment reactions amount by comment id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'object',
          properties: {
            commentId: { type: 'string' },
            likes: { type: 'number' },
            dislikes: { type: 'number' },
          },
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get comment reactions amount by comment id failed',
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

const getCommentReactionsByUserIdSchema = {
  tags: ['comment-reaction'],
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
      type: { type: 'string' },
      take: { type: 'number' },
      skip: { type: 'number' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get comment reactions by user id successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: commentReactionSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get comment reactions by user id failed',
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

const getCommentReactionByIdSchema = {
  tags: ['comment-reaction'],
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
      description: 'Get comment reaction by id successful',
      properties: {
        message: { type: 'string' },
        payload: commentReactionSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Get comment reaction by id failed',
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

const getCommentReactionsSchema = {
  tags: ['comment-reaction'],
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
      description: 'Get comment reactions successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: commentReactionSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get comment reactions failed',
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

const createCommentReactionSchema = {
  tags: ['comment-reaction'],
  type: 'object',
  security: [{ bearer: [] }],
  body: {
    type: 'object',
    properties: {
      commentId: { type: 'string' },
      userId: { type: 'string' },
      type: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'object',
      description: 'Create comment reaction successful',
      properties: {
        message: { type: 'string' },
        payload: commentReactionSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Create comment reaction failed',
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

const deleteCommentReactionSchema = {
  tags: ['comment-reaction'],
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
      description: 'Delete comment reaction successful',
      properties: {
        message: { type: 'string' },
        payload: commentReactionSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Delete comment reaction failed',
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
  commentReactionSchema,
  createCommentReactionSchema,
  deleteCommentReactionSchema,
  getCommentReactionByIdSchema,
  getCommentReactionsAmountByCommentIdSchema,
  getCommentReactionsByCommentIdSchema,
  getCommentReactionsByUserIdSchema,
  getCommentReactionsSchema
}

