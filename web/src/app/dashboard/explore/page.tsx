'use client'

import { Error } from '@/components/Error'
import { ListUsers } from '@/components/ListUsers'
import { Title } from '@/components/Title'
import { useUserStore } from '@/stores/user.store'

const Explore = () => {
  const { userInfo } = useUserStore((state) => state)

  if (!userInfo) {
    return (
      <Error message="Ocorreu um erro ao carregar as informações do usuário" />
    )
  }

  return (
    <div className="h-full px-4 w-full max-w-[70%]">
      <div className="flex flex-row items-center justify-between px-4 py-2 w-full">
        <Title className="w-fit">Usuários para explorar</Title>
      </div>
      <ListUsers token={userInfo.token} userId={userInfo.id} />
    </div>
  )
}

export default Explore
