export * from '@fastify/multipart'

declare module '@fastify/multipart' {
  interface MultipartFields {
    userId?: {
      value: string
      fieldname: string
    }
    file?: {
      fieldname: string
    }
  }
}
