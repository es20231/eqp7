const ImageSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    userId: { type: 'string' },
    url: { type: 'string' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
}

const getImagesSchema = {
  tags: ['image'],
  type: 'object',
  security: [{ bearer: [] }],
  response: {
    200: {
      type: 'array',
      items: ImageSchema,
    },
    400: {
      type: 'object',
      description: 'Get images failed',
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
const getImageByIdSchema = {
  tags: ['image'],
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
      description: 'Get image by id successful',
      properties: {
        message: { type: 'string' },
        payload: ImageSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Get image by id failed',
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
const getImagesByUserIdSchema = {
  tags: ['image'],
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
      description: 'Get image by user id successful',
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
      description: 'Get image by user id failed',
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
const createImageSchema = {
  tags: ['image'],
  type: 'object',
  security: [{ bearer: [] }],
  // body: {
  //   type: 'object',
  //   properties: {
  //     userId: { type: 'string' },
  //     file: { type: 'string', format: 'binary' },
  //   },
  // },
  response: {
    200: {
      type: 'object',
      description: 'Create image successful',
      properties: {
        message: { type: 'string' },
        payload: ImageSchema,
      },
    },
    400: {
      type: 'object',
      description: 'Create image failed',
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
const deleteImageSchema = {
  tags: ['image'],
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
      description: 'Delete image successful',
      properties: {
        message: { type: 'string' },
      },
    },
    400: {
      type: 'object',
      description: 'Delete image failed',
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
  ImageSchema,
  createImageSchema,
  deleteImageSchema,
  getImageByIdSchema,
  getImagesByUserIdSchema,
  getImagesSchema
}

