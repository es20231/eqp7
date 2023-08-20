'use client'

import { UserDTO, useGetAllUsers } from '@/queries/user.query'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Share2, UserMinus2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Error } from './Error'
import { Text } from './Text'
import { UserPresentation } from './UserPresentation'

interface ListUsersProps {
  token: string
  userId: string
  search?: string
  draft?: string
  preview?: boolean
}

const ListUsers = ({
  token,
  userId,
  search,
  draft,
  preview = false,
}: ListUsersProps) => {
  const { data, isLoading, isError } = useGetAllUsers({ token, search })

  if (isLoading) {
    // TODO: skeleton loader
    return <p>Loading...</p>
  }

  if (isError || !data)
    return <Error message="Ocorreu um erro ao carregar os usuários" />

  console.log('data: ', data)
  const users = preview ? data.slice(0, 5) : data

  const usersToShow = users
    .filter((user) => user.id !== userId)
    .filter(
      (user) =>
        user.username.includes(draft || '') ||
        user.fullName.includes(draft || '') ||
        user.email.includes(draft || ''),
    )

  return (
    <ScrollArea.Root className="w-full h-[85%]">
      <ScrollArea.Viewport className="w-full h-full py-3 px-4">
        <div className="flex flex-col w-full gap-3">
          {usersToShow.length > 0 ? (
            usersToShow.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <div className="flex flex-col items-center justify-center">
              <UserMinus2
                className="text-zinc-800 dark:text-slate-50"
                size={64}
                strokeWidth={1.5}
              />
              <Text>
                Parece que não há ninguém por aqui.
                <br /> Compartilhe com seus amigos para criarem momentos <br />
                <span className="flex items-center justify-center gap-2 text-pacific-blue-500 font-semibold text-xl">
                  Inesquecíveis
                  <Tooltip.Provider delayDuration={500}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Share2
                          size={20}
                          className="cursor-pointer"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              'https://minigproject.vercel.app/',
                            )
                            toast.info(
                              'Link copiado para a área de transferência',
                            )
                          }}
                        />
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-zinc-800 dark:text-slate-50 select-none rounded-md bg-gray-300 dark:bg-dark-slate-gray-400 px-4 py-2 text-sm leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
                          sideOffset={5}
                          side="bottom"
                        >
                          Copiar link
                          <Tooltip.Arrow className="fill-gray-300 dark:fill-dark-slate-gray-400" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </span>
              </Text>
            </div>
          )}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

interface UserCardProps {
  user: UserDTO
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link href={`/dashboard/explore/user/${user.id}`}>
      <div className="w-full flex flex-row bg-slate-100 dark:bg-dark-slate-gray-500 px-4 py-2 rounded-lg">
        <UserPresentation
          name={user.fullName}
          userImage={user.profilePicture}
          username={user.username}
        />
      </div>
    </Link>
  )
}

export { ListUsers }
