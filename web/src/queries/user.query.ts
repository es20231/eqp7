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

  console.log('getUserImagesData', data)

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

export { useGetUserImages, useGetUserPosts }
