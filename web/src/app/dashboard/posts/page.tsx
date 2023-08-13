'use client'

import { Error } from '@/components/Error'
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
    <div className="h-full w-full max-w-full overflow-hidden">
      <UserPosts token={userInfo.token} userId={userInfo.id} />
    </div>
  )
}
