import { ImageSchema } from './image.schema'
import { PostSchema } from './post.schema'

const UserSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'User id' },
    username: {
      type: 'string',
      description: 'User username',
    },
    email: { type: 'string', description: 'User email', format: 'email' },
    fullName: { type: 'string', description: 'User full name' },
    profilePicture: {
      type: 'string',
      description: 'User profile picture url',
      format: 'uri',
    },
    emailVerified: {
      type: 'boolean',
      default: false,
      description: 'User email verification status',
    },
    createdAt: {
      type: 'string',
      description: 'User creation date',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      description: 'User last update date',
      format: 'date-time',
    },
  },
}

const getUsersSchema = {
  tags: ['user'],
  type: 'object',
  security: [{ bearer: [] }],
  response: {
    200: {
      type: 'object',
      description: 'Get users successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: UserSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get users failed',
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

const getUserByIdSchema = {
  tags: ['user'],
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
      description: 'Get user by id successful',
      properties: {
        message: { type: 'string' },
        payload: UserSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Get user by id failed',
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

const getUserByUsernameSchema = {
  tags: ['user'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      username: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get user by username successful',
      properties: {
        message: { type: 'string' },
        payload: UserSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Get user by username failed',
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

const getUserByEmailSchema = {
  tags: ['user'],
  type: 'object',
  security: [{ bearer: [] }],
  params: {
    type: 'object',
    properties: {
      email: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get user by email successful',
      properties: {
        message: { type: 'string' },
        payload: UserSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Get user by email failed',
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

const createUserSchema = {
  tags: ['user'],
  type: 'object',
  security: [{ bearer: [] }],
  body: {
    type: 'object',
    required: ['username', 'email', 'password', 'fullName'],
    properties: {
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 },
      fullName: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Create user successful',
      properties: {
        message: { type: 'string' },
        payload: UserSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Create user failed',
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

const updateUserSchema = {
  tags: ['user'],
  type: 'object',
  security: [{ bearer: [] }],
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      fullName: { type: 'string' },
      profilePicture: { type: 'string', format: 'uri' },
      passord: { type: 'string', minLength: 8 },
      biography: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Update user successful',
      properties: {
        message: { type: 'string' },
        payload: UserSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Update user failed',
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

const deleteUserSchema = {
  tags: ['user'],
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
      description: 'Delete user successful',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      description: 'Delete user failed',
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

const getUserImagesSchema = {
  tags: ['user'],
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
      description: 'Get user images successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'array',
          items: ImageSchema,
        },
      },
    },
    400: {
      type: 'object',
      description: 'Get user images failed',
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

const getUserPostsSchema = {
  tags: ['user'],
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
      description: 'Get user posts successful',
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
      description: 'Get user posts failed',
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
  UserSchema,
  createUserSchema,
  deleteUserSchema,
  getUserByEmailSchema,
  getUserByIdSchema,
  getUserByUsernameSchema,
  getUserImagesSchema,
  getUserPostsSchema,
  getUsersSchema,
  updateUserSchema,
}
