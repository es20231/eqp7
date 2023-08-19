import { UserImagesDTO } from '@/queries/user.query'
import { api } from '@/services/axios'
import { useMutation } from 'react-query'

export type UpdateImageDTO = {
  filter: string
  id: string
}

interface UpdateImageProps {
  image: UpdateImageDTO
  token: string
}

const updateImage = async ({ image, token }: UpdateImageProps) => {
  const { data } = await api(token).patch(`/images/${image.id}`, {
    ...image,
    id: undefined,
  })

  const imageUpdated: UserImagesDTO = data.payload

  return imageUpdated
}

const useUpdateImage = () => {
  return useMutation(({ image, token }: UpdateImageProps) =>
    updateImage({ image, token }),
  )
}

export { useUpdateImage }
