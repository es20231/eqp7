import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const Button = ({
  children,
  className,
  leftIcon,
  rightIcon,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        [
          '2xl:py-2 py-1 text-sm 2xl:text-base px-4 w-full bg-pacific-blue-500 flex flex-row gap-2 rounded-md items-center justify-center text-slate-50',
        ],
        className,
      )}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}

export { Button }
