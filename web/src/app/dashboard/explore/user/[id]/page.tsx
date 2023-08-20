'use client'

import { Button } from '@/components/Button'
import { Error } from '@/components/Error'
import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import { UserAvatar } from '@/components/UserAvatar'
import { UserPosts } from '@/components/UserPosts'
import { formatName } from '@/components/UserPresentation'
import { useGetUser } from '@/queries/user.query'
import { useUserStore } from '@/stores/user.store'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface UserDetailsProps {
  params: {
    id: string
  }
}

const UserDetails = ({ params }: UserDetailsProps) => {
  const { id } = params

  const { userInfo } = useUserStore((state) => state)

  const router = useRouter()
  if (userInfo && !userInfo.emailVerified) router.push('/auth/activate')

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
    <ScrollArea.Root className="w-full h-[85%]">
      <ScrollArea.Viewport className="w-full h-full px-4">
        <div className="h-full px-4 w-full max-w-[70%] flex flex-col gap-8 relative mx-auto">
          <Button
            className="w-fit bg-transparent absolute top-2 left-2 dark:hover:bg-dark-slate-gray-500 hover:bg-slate-200 text-zinc-800 dark:text-slate-50"
            onClick={() => window.history.back()}
            leftIcon={
              <ChevronLeft
                size={24}
                className="text-zinc-800 dark:text-slate-50"
              />
            }
          >
            {fetchedUser.username}
          </Button>
          <div className="w-full flex flex-row gap-4 items-center justify-between mt-16">
            <div className="h-56 w-56">
              <UserAvatar
                userImage={fetchedUser.profilePicture}
                exibitionName={formatName(fetchedUser.fullName)}
                width={120}
                height={120}
              />
            </div>
            <div className="flex flex-col flex-1 gap-1 items-center justify-center">
              <Text className="font-bold text-start">
                {fetchedUser.fullName}
              </Text>
              <Text className="text-gray-500 dark:text-gray-300 text-start mb-4">
                @{fetchedUser.username}
              </Text>
              <Text className="text-start">Biografia:</Text>
              <Text className="text-justify max-w-5xl text-gray-500 dark:text-zinc-300">
                {fetchedUser.biography || (
                  <span className="text-orange-300">
                    Este usuário ainda não possui biografia
                  </span>
                )}
              </Text>
            </div>
          </div>
          <div className="px-4">
            <Title className="text-start">Posts</Title>
          </div>
          <UserPosts token={userInfo?.token || ''} userId={id} />
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation="vertical"
        className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      >
        <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

export default UserDetails
