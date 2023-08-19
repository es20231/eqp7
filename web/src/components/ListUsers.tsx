'use client'

import { UserDTO, useGetAllUsers } from '@/queries/user.query'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import Link from 'next/link'
import { Error } from './Error'
import { UserPresentation } from './UserPresentation'

interface ListUsersProps {
  token: string
  userId: string
  preview?: boolean
}

const ListUsers = ({ token, userId, preview = false }: ListUsersProps) => {
  const { data, isLoading, isError } = useGetAllUsers({ token })

  if (isLoading) {
    // TODO: skeleton loader
    return <p>Loading...</p>
  }

  if (isError || !data)
    return <Error message="Ocorreu um erro ao carregar os usuários" />

  const users = preview ? data.slice(0, 5) : data

  return (
    <ScrollArea.Root className="w-full h-[85%]">
      <ScrollArea.Viewport className="w-full h-full py-3 px-4">
        <div className="flex flex-col w-full gap-3">
          {users
            .filter((user) => user.id !== userId)
            .map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
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
