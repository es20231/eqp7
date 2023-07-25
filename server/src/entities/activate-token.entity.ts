interface ActivateToken {
  id: string
  token: string
  userId: string
  activatedAt?: Date

  createdAt: Date
  updatedAt: Date
}

export { ActivateToken }
