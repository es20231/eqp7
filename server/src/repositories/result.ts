export type RepositoryResult<T> = {
  ok: boolean
  message: string
  payload: T | undefined
}
