import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

const Text = ({ className, ...rest }: TextProps) => {
  return (
    <p
      className={twMerge([
        'text-zinc-800 dark:text-slate-50 w-full text-base text-center',
        className,
      ])}
      {...rest}
    />
  )
}

export { Text }
