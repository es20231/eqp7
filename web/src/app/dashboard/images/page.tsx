'use client'

import { Error } from '@/components/Error'
import { Title } from '@/components/Title'
import { UploadImage } from '@/components/UploadImage'
import { UserImages } from '@/components/UserImages'
import { useUserStore } from '@/stores/user.store'
import { useRouter } from 'next/navigation'

const Images = () => {
  const { userInfo } = useUserStore((state) => state)

  const router = useRouter()
  if (userInfo && !userInfo.emailVerified) router.push('/auth/activate')

  if (!userInfo) {
    return (
      <Error message="Ocorreu um erro ao carregar as informaçÕes do usuário" />
    )
  }

  return (
    <div className="h-full px-4 w-full max-w-[70%]">
      <div className="flex flex-row items-center justify-between px-4 py-2 w-full">
        <Title className="w-fit">Minhas imagens</Title>
        <UploadImage token={userInfo.token} userId={userInfo.id} />
      </div>
      <UserImages token={userInfo.token} userId={userInfo.id} />
    </div>
  )
}

export default Images
