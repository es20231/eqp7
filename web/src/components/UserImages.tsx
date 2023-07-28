import { Error } from '@/components/Error'
import { useGetUserImages } from '@/queries/user.query'
import Image from 'next/image'

interface UserImagesProps {
  userId: string
  token: string
}

const UserImages = ({ userId, token }: UserImagesProps) => {
  const { data, isLoading, isError } = useGetUserImages(token, userId)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !data)
    return <Error message="Ocorreu um erro ao carregar as imagens do usuário" />

  return (
    <div className="flex flex-row gap-2 max-w-sm">
      <p>User images</p>
      {data.map((image) => (
        <Image
          alt="user image"
          key={image.id}
          src={image.url}
          width={50}
          height={50}
          className="rounded-full w-10 h-10"
        />
      ))}
    </div>
  )
}

export { UserImages }
