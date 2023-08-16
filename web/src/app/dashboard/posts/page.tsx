'use client'

import { Error } from '@/components/Error'
import { Title } from '@/components/Title'
import { UserPosts } from '@/components/UserPosts'
import { useUserStore } from '@/stores/user.store'

export default function Posts() {
  const { userInfo } = useUserStore((state) => state)

  if (!userInfo) {
    return (
      <Error message="Ocorreu um erro ao carregar as informaçÕes do usuário" />
    )
  }

  return (
    <div className="h-full px-4 w-full max-w-[70%]">
      <div className="flex flex-row items-center justify-between px-4 py-2 w-full">
        <Title className="w-fit">Meus posts</Title>
      </div>
      <UserPosts token={userInfo.token} userId={userInfo.id} />
    </div>
  )
}
