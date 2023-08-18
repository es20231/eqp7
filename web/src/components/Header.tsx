// interface HeaderProps {}
'use client'

import { useUserStore } from '@/stores/user.store'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { ChevronDown, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HTMLAttributes, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'
import { Logo } from './Logo'
import { Text } from './Text'
import { ThemeSwitch } from './ThemeSwitch'
import { UserPresentation } from './UserPresentation'

const Header = () => {
  const { userInfo } = useUserStore((state) => state)

  const handleSignOut = useCallback(() => {
    if (typeof window !== 'undefined') {
      signOut()
    }
  }, [])

  if (!userInfo) return null

  return (
    <nav className="relative bg-transparent min-w-full grid grid-cols-[20%_1fr_35%] 2xl:grid-cols-[20%_1fr_30%] items-center justify-evenly py-3">
      <div className="w-full items-center justify-end px-4 flex">
        <Logo mode="collapsed" width={50} height={50} />
      </div>
      <div className="w-full flex items-center justify-start px-4 gap-5 py-2">
        <NavOption name="Dashboard" route="/dashboard" />
        <NavOption name="Imagens" route="/dashboard/images" />
        <NavOption name="Posts" route="/dashboard/posts" />
        <NavOption name="Explorar" route="/dashboard/explore" />
      </div>
      <div className="w-full h-full relative flex flex-row px-12 items-center justify-between py-3">
        <UserPresentation
          name={userInfo.fullName}
          username={userInfo.username}
          userImage={userInfo.profilePicture || ''}
        />
        <Dropdown.Root>
          <Dropdown.Trigger>
            <ChevronDown />
          </Dropdown.Trigger>

          <Dropdown.Portal>
            <Dropdown.Content
              sideOffset={5}
              className="min-w-[220px] bg-gray-300 rounded-md shadow-lg p-4 dark:bg-slate-900/90 flex flex-col items-center justify-center gap-4 px-3 data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            >
              <Dropdown.Arrow className="fill-gray-300 dark:fill-slate-900" />
              <Dropdown.Item className="w-full focus:outline-none">
                <Link href="/dashboard/profile">
                  <Text className="cursor-pointer text-center hover:bg-gray-400/30 dark:hover:bg-slate-700 transition-colors px-2 py-1 rounded-md">
                    Visualizar perfil
                  </Text>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className="focus:outline-none w-full">
                <Button
                  onClick={handleSignOut}
                  rightIcon={<LogOut className="text-slate-50" size={20} />}
                  className="text-base"
                >
                  Sair
                </Button>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>

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

  const isSelected =
    path === route || (route === '/dashboard/explore' && path.includes('/user'))

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
