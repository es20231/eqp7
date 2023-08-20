import { UserSchema } from './user.schema'

const loginSchema = {
  tags: ['auth'],
  type: 'object',
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Login successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: UserSchema,
          },
        },
      },
    },
    400: {
      type: 'object',
      description: 'Login failed',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

const registerSchema = {
  tags: ['auth'],
  type: 'object',
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', default: 'cassi' },
      password: { type: 'string', default: 'test1234' },
      email: { type: 'string', default: 'test@test.com' },
      fullName: { type: 'string', default: 'Cassiano' },
    },
  },
  response: {
    201: {
      type: 'object',
      description: 'Register successful',
      properties: {
        message: { type: 'string' },
        payload: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            user: UserSchema,
          },
        },
      },
    },
    400: {
      type: 'object',
      description: 'Register failed',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

const activateSchema = {
  tags: ['auth'],
  type: 'object',
  security: [{ BearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      token: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Activate successful',
      properties: {
        user: {
          ...UserSchema,
          properties: {
            ...UserSchema.properties,
            emailVerified: { type: 'boolean', default: true },
          },
        },
      },
    },
    400: {
      type: 'object',
      description: 'Activate failed',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

const getActivateTokenSchema = {
  tags: ['auth'],
  type: 'object',
  security: [{ BearerAuth: [] }],
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      description: 'Get activate token successful',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      description: 'Get activate token failed',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

export { activateSchema, getActivateTokenSchema, loginSchema, registerSchema }
