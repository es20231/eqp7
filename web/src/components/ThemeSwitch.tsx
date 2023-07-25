'use client'

import * as Switch from '@radix-ui/react-switch'
import { MoonStar, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'

// interface ThemeSwitchProps {}

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme()

  const handleThoggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  return (
    <div className="absolute top-8 right-8 flex flex-row gap-2">
      <MoonStar
        className="text-zinc-700 dark:text-slate-200"
        size={24}
        strokeWidth={2}
      />
      <Switch.Root
        className="w-[42px] h-[25px] bg-zinc-800 dark:bg-white rounded-full relative shadow-[0_2px_10px] shadow-zinc-800 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
        onClick={handleThoggleTheme}
      >
        <Switch.Thumb className="block w-[21px] h-[18px] bg-white dark:bg-zinc-900 rounded-full shadow-[0_2px_2px] shadow-zinc-800 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
      <Sun
        className="text-zinc-700 dark:text-slate-200"
        size={24}
        strokeWidth={2}
      />
    </div>
  )
}

export { ThemeSwitch }
