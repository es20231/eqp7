'use client'

import { ListUsers } from '@/components/ListUsers'
import { Title } from '@/components/Title'
import { UserImages } from '@/components/UserImages'
import { UserPosts } from '@/components/UserPosts'
import { useUserStore } from '@/stores/user.store'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useSession } from 'next-auth/react'
import { Suspense, useEffect } from 'react'

const Dashboard = () => {
  const { data } = useSession()

  const { userInfo, setUserInfo } = useUserStore((state) => state)

  useEffect(() => {
    if (data) {
      setUserInfo({
        ...data.user,
      })
    }
  }, [])

  return (
    userInfo && (
      <Suspense fallback={<div>Carregando...</div>}>
        <div className="h-full px-4 w-full max-w-[70%] mx-auto overflow-hidden">
          <div className="flex flex-row items-center justify-between px-4 py-2 w-full">
            <Title className="w-fit">Dashboard</Title>
          </div>
          <ScrollArea.Root className="w-full h-[85%]">
            <ScrollArea.Viewport className="w-full h-full py-3 px-4">
              <div>
                <div className="flex flex-col items-center justify-between px-4 py-2 w-full">
                  <Title className="text-start text-xl">Últimas imagens</Title>
                </div>
                <UserImages
                  token={userInfo.token}
                  userId={userInfo.id}
                  preview
                />
              </div>
              <div>
                <div className="flex flex-col items-center justify-between px-4 py-2 w-full">
                  <Title className="text-start text-xl">Últimos posts</Title>
                </div>
                <UserPosts
                  token={userInfo.token}
                  userId={userInfo.id}
                  preview
                />
              </div>
              <div>
                <div className="flex flex-col items-center justify-between px-4 py-2 w-full">
                  <Title className="text-start text-xl">
                    Usuários para explorar
                  </Title>
                </div>
                <ListUsers
                  token={userInfo.token}
                  userId={userInfo.id}
                  preview
                />
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </div>
      </Suspense>
    )
  )
}

export default Dashboard
