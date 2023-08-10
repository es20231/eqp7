'use client'

import * as Switch from '@radix-ui/react-switch'
import { MoonStar, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { HTMLAttributes, Suspense, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

type ThemeSwitchProps = HTMLAttributes<'div'>

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const { theme, setTheme } = useTheme()

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [setTheme, theme])

  return (
    <Suspense fallback={null}>
      <div
        className={twMerge(
          'absolute top-8 right-8 flex flex-row gap-2',
          className,
        )}
      >
        <MoonStar
          className="text-zinc-700 dark:text-slate-200"
          size={24}
          strokeWidth={2}
        />
        <Switch.Root
          className="w-[42px] h-[26px] bg-zinc-800 dark:bg-white rounded-full relative shadow-[0_2px_10px] shadow-zinc-800 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default"
          onCheckedChange={handleToggleTheme}
          data-state={theme && theme !== 'dark' ? 'checked' : 'unchecked'}
          defaultValue={theme && theme !== 'dark' ? 'on' : 'off'}
        >
          <Switch.Thumb
            defaultValue={theme && theme !== 'dark' ? 'on' : 'off'}
            data-state={theme && theme !== 'dark' ? 'checked' : 'unchecked'}
            className="block w-[21px] h-[18px] bg-white dark:bg-zinc-900 rounded-full shadow-[0_2px_2px] shadow-zinc-800 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px] "
          />
        </Switch.Root>
        <Sun
          className="text-zinc-700 dark:text-slate-200"
          size={24}
          strokeWidth={2}
        />
      </div>
    </Suspense>
  )
}

export { ThemeSwitch }
