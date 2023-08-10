import { api } from '@/services/axios'
import { QueryFunctionContext, useQuery } from 'react-query'

type DeleteImageQueryKey = ['deleteImage', { token: string; imageId: string }]

const deleteImage = async ({
  queryKey,
}: QueryFunctionContext<DeleteImageQueryKey>) => {
  const [, { token, imageId }] = queryKey

  const { data } = await api(token).delete(`/images/${imageId}`)

  return data
}

interface UseDeleteImageProps {
  token: string
  imageId: string
}

const useDeleteImage = ({ token, imageId }: UseDeleteImageProps) => {
  return useQuery(['deleteImage', { token, imageId }], deleteImage, {
    enabled: false,
  })
}

export { useDeleteImage }
