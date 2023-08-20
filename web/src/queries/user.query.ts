import { api } from '@/services/axios'
import { QueryFunctionContext, useQuery } from 'react-query'
import { UserPostDTO } from './post.query'

type GetUserImagesQueryKey = ['images', { token: string; userId: string }]

export type UserImagesDTO = {
  id: string
  url: string
  userId: string
  createdAt: string
}

const getUserImages = async ({
  queryKey,
}: QueryFunctionContext<GetUserImagesQueryKey>) => {
  const [, { token, userId }] = queryKey

  const { data } = await api(token).get(`/users/${userId}/images`)

  return data.payload as UserImagesDTO[]
}

interface UseGetUserImageProps {
  token: string
  userId: string
}

const useGetUserImages = ({ token, userId }: UseGetUserImageProps) => {
  return useQuery(['images', { token, userId }], getUserImages)
}

type GetUserPostsQueryKey = ['posts', { token: string; userId: string }]

export type UserPosts = UserPostDTO[]

const getUserPosts = async ({
  queryKey,
}: QueryFunctionContext<GetUserPostsQueryKey>) => {
  const [, { token, userId }] = queryKey

  const { data } = await api(token).get(`/users/${userId}/posts`)

  console.log('getUserPostsData', data)

  return data.payload as UserPosts
}

interface UseGetUserPostsProps {
  token: string
  userId: string
}

const useGetUserPosts = ({ token, userId }: UseGetUserPostsProps) => {
  return useQuery(['posts', { token, userId }], getUserPosts)
}

type GetAllUsersQueryKey = ['users', { token: string }]

export type UserDTO = {
  id: string
  fullName: string
  username: string
  email: string
  biography: string
  profilePicture: string
  emailVerified: boolean
}

const getAllUsers = async ({
  queryKey,
}: QueryFunctionContext<GetAllUsersQueryKey>) => {
  const [, { token }] = queryKey

  const { data } = await api(token).get('/users')

  return data.payload as UserDTO[]
}

const useGetAllUsers = ({ token }: { token: string }) => {
  return useQuery(['users', { token }], getAllUsers)
}

type GetUserQueryKey = ['user', { token: string; id: string }]

const getUser = async ({ queryKey }: QueryFunctionContext<GetUserQueryKey>) => {
  const [, { token, id }] = queryKey

  const { data } = await api(token).get(`/users/${id}`)

  return data.payload as UserDTO
}

const useGetUser = ({ token, id }: { token: string; id: string }) => {
  return useQuery(['user', { token, id }], getUser)
}

type ActivateUserQueryKey = [
  'activate',
  { token: string; activateToken: string },
]

const activateUser = async ({
  queryKey,
}: QueryFunctionContext<ActivateUserQueryKey>) => {
  const [, { token, activateToken }] = queryKey

  const { data } = await api(token).get(`/auth/activate/${activateToken}`)

  console.log('activateUserData', data)

  return data.payload as UserDTO
}

const useActivateUser = ({
  token,
  activateToken,
}: {
  token: string
  activateToken: string
}) => {
  return useQuery(['activate', { token, activateToken }], activateUser)
}

export {
  useActivateUser,
  useGetAllUsers,
  useGetUser,
  useGetUserImages,
  useGetUserPosts,
}
