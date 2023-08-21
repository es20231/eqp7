import { api } from '@/services/axios'
import { QueryFunctionContext, useInfiniteQuery, useQuery } from 'react-query'
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
  pageParam = 1,
}: QueryFunctionContext<GetUserImagesQueryKey>) => {
  const [, { token, userId }] = queryKey

  const take = 12

  const skip = (Math.max(pageParam, 1) - 1) * take

  const { data } = await api(token).get(
    `/users/${userId}/images?take=${take}&skip=${skip}`,
  )

  return data.payload as UserImagesDTO[]
}

interface UseGetUserImageProps {
  token: string
  userId: string
}

const useGetUserImages = ({ token, userId }: UseGetUserImageProps) => {
  return useInfiniteQuery({
    queryKey: ['images', { token, userId }],
    queryFn: ({ pageParam, meta }) =>
      getUserImages({
        pageParam,
        queryKey: ['images', { token, userId }],
        meta,
      }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 12) {
        return undefined
      }

      return pages.length + 1
    },
  })
}

type GetUserPostsQueryKey = ['posts', { token: string; userId: string }]

export type UserPosts = UserPostDTO[]

const getUserPosts = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<GetUserPostsQueryKey>) => {
  const [, { token, userId }] = queryKey

  const take = 6

  const skip = (Math.max(pageParam, 1) - 1) * take

  const { data } = await api(token).get(
    `/users/${userId}/posts?take=${take}&skip=${skip}`,
  )

  console.log('getUserPostsData', data)

  return data.payload as UserPosts
}

interface UseGetUserPostsProps {
  token: string
  userId: string
}

const useGetUserPosts = ({ token, userId }: UseGetUserPostsProps) => {
  return useInfiniteQuery({
    queryKey: ['posts', { token, userId }],
    queryFn: ({ pageParam, meta }) =>
      getUserPosts({
        pageParam,
        queryKey: ['posts', { token, userId }],
        meta,
      }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 6) {
        return undefined
      }

      return pages.length + 1
    },
  })
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
  pageParam = 1,
}: QueryFunctionContext<GetAllUsersQueryKey>) => {
  const [, { token, search }] = queryKey

  const take = 12

  const skip = (Math.max(pageParam, 1) - 1) * take

  const { data } = await api(token).get(
    `/users?take=${take}&skip=${skip}${search ? `?search=${search}` : ``}`,
  )

  return data.payload as UserDTO[]
}

interface UseGetAllUsersProps {
  token: string
  search?: string
}

const useGetAllUsers = ({ token, search }: UseGetAllUsersProps) => {
  return useInfiniteQuery({
    queryKey: ['users', { token, search: search || '' }],
    queryFn: ({ pageParam, meta }) =>
      getAllUsers({
        pageParam,
        meta,
        queryKey: ['users', { token, search: search || '' }],
      }),
    keepPreviousData: true,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 12) {
        return undefined
      }

      return pages.length + 1
    },
  })
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
