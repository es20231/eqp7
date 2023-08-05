import { api } from '@/services/axios'
import { QueryFunctionContext, useQuery } from 'react-query'

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

const useGetUserImages = (token: string, userId: string) => {
  return useQuery(['images', { token, userId }], getUserImages)
}

type GetUserPostsQueryKey = ['posts', { token: string; userId: string }]

export type UserPosts = {
  id: string
  subtitle: string
  imageId: string
  userId: string
}

const getUserPosts = async ({
  queryKey,
}: QueryFunctionContext<GetUserPostsQueryKey>) => {
  const [, { token, userId }] = queryKey

  const { data } = await api(token).get(`/users/${userId}/posts`)

  console.log('getUserPostsData', data)

  return data.payload as UserPosts[]
}

const useGetUserPosts = (token: string, userId: string) => {
  return useQuery(['posts', { token, userId }], getUserPosts)
}

export { useGetUserImages, useGetUserPosts }
