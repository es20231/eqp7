'use client'

import { Button } from '@/components/Button'
import { Error } from '@/components/Error'
import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import { UserAvatar } from '@/components/UserAvatar'
import { formatName } from '@/components/UserPresentation'
import { useGetUser } from '@/queries/user.query'
import { useUserStore } from '@/stores/user.store'
import { ChevronLeft } from 'lucide-react'

interface UserDetailsProps {
  params: {
    id: string
  }
}

const UserDetails = ({ params }: UserDetailsProps) => {
  const { id } = params

  const { userInfo } = useUserStore((state) => state)

  const {
    data: fetchedUser,
    isLoading,
    isError,
  } = useGetUser({
    id,
    token: userInfo?.token || '',
  })

  if (isLoading) return <p>loading...</p> // TODO: skeleton loader

  if (isError || !fetchedUser)
    return (
      <Error message="Não foi possível carregar as informações do usuário" />
    )

  return (
    <div className="h-full px-4 w-full max-w-[70%] flex flex-col gap-8 relative">
      <Button
        className="w-fit bg-transparent absolute top-2 left-2 dark:hover:bg-dark-slate-gray-500 hover:bg-slate-200 "
        onClick={() => window.history.back()}
      >
        <ChevronLeft size={24} className="text-zinc-800 dark:text-slate-50" />
      </Button>
      <div className="w-full grid grid-cols-[25%_1fr] gap-4 items-center justify-start mt-8">
        <div className="h-56 w-56">
          <UserAvatar
            userImage={fetchedUser.profilePicture}
            exibitionName={formatName(fetchedUser.fullName)}
            width={120}
            height={120}
          />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <Text className="font-bold text-start">{fetchedUser.fullName}</Text>
          <Text className="text-gray-500 dark:text-gray-300 text-start mb-4">
            @{fetchedUser.username}
          </Text>
          <Text className="text-start">Biografia:</Text>
          <Text className="text-justify max-w-5xl text-gray-500 dark:text-zinc-300">
            {fetchedUser.biography ||
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in lectus sit amet metus congue ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas ultricies ligula ac libero vehicula, in tempor felis pellentesque. Sed tristique lobortis condimentum. Sed ac sagittis ipsum. Curabitur convallis lobortis felis, eu fermentum ipsum. Sed gravida, ipsum eget pharetra dignissim, arcu est condimentum arcu, non aliquam odio ligula sed turpis. Vivamus lacinia, odio eget bibendum scelerisque, nisi odio auctor dui, eget gravida lectus elit sed velit.'}
          </Text>
        </div>
      </div>
      <div className="px-4">
        <Title className="text-start">Posts</Title>
      </div>
    </div>
  )
}

export default UserDetails
