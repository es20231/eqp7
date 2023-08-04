// interface HeaderProps {}
'use client'

import { useUserStore } from '@/stores/user.store'
import * as Avatar from '@radix-ui/react-avatar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { Logo } from './Logo'
import { ThemeSwitch } from './ThemeSwitch'

const Header = () => {
  const { userInfo } = useUserStore((state) => state)

  if (!userInfo) return null

  const fallbackAvatar =
    userInfo.fullName.split(' ').length >= 2
      ? userInfo.fullName
          .split(' ')
          .map((name, index) => {
            if (
              index === 0 ||
              index === userInfo.fullName.split(' ').length - 1
            )
              return name[0].toUpperCase()

            return ''
          })
          .join('')
      : userInfo.fullName.slice(0, 2).toUpperCase()

  return (
    <nav className="relative bg-transparent min-w-full grid grid-cols-[20%_1fr_20%] items-center justify-evenly py-3">
      <div className="w-full items-center justify-end px-4 flex">
        <Logo mode="collapsed" width={50} height={50} />
      </div>
      <div className="w-full flex items-center justify-start px-4 gap-5 py-2">
        <NavOption name="Dashboard" route="/dashboard" />
        <NavOption name="Imagens" route="/dashboard/images" />
        <NavOption name="Posts" route="/dashboard/posts" />
        <NavOption name="Explorar" route="/dashboard/explore" />
      </div>
      <div className="w-full h-full relative flex flex-row px-12 items-center justify-between py-3 ">
        <Avatar.Root className="border-[2px] rounded-full border-pacific-blue-500 overflow-hidden flex items-center justify-center h-10 w-10 bg-slate-600">
          <Avatar.Image
            alt="user image"
            src={userInfo?.profilePicture || ''}
            width={40}
            height={40}
            className=" h-10 w-10"
          />
          <Avatar.AvatarFallback className="text-slate-50">
            {fallbackAvatar}
          </Avatar.AvatarFallback>
        </Avatar.Root>
        <ThemeSwitch className="relative inset-0" />
      </div>
    </nav>
  )
}

interface NavOptionProps extends HTMLAttributes<HTMLAnchorElement> {
  name: string
  route: string
}

const NavOption = ({ name, route, ...rest }: NavOptionProps) => {
  const path = usePathname()

  const isSelected = path === route

  return (
    <Link
      className={twMerge(
        'text-zinc-900 dark:text-slate-50 py-2 px-4 dark:hover:bg-slate-900/80 transition-colors rounded-md hover:bg-gray-300',
        isSelected ? 'dark:bg-slate-900/80 bg-gray-300' : '',
      )}
      href={route}
      {...rest}
    >
      {name}
    </Link>
  )
}

export { Header }
