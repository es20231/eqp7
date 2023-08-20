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

type GetAllUsersQueryKey = ['users', { token: string; search: string }]

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
  const [, { token, search }] = queryKey

  const { data } = await api(token).get(
    `/users${search ? `?search=${search}` : ''}`,
  )

  return data.payload as UserDTO[]
}

interface UseGetAllUsersProps {
  token: string
  search?: string
}

const useGetAllUsers = ({ token, search }: UseGetAllUsersProps) => {
  return useQuery(['users', { token, search: search || '' }], getAllUsers)
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

export { useGetAllUsers, useGetUser, useGetUserImages, useGetUserPosts }
