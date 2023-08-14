'use client'

import { InputHTMLAttributes, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  around?: string
  left?: ReactNode
  right?: ReactNode
}

const Input = ({
  name,
  left,
  right,
  around,
  className,
  ...rest
}: InputProps) => {
  const { register } = useFormContext()

  return (
    <div
      className={twMerge(
        [
          'flex flex-row items-center justify-center gap-2 rounded-md px-4 py-1 2xl:py-2 shadow-sm',
        ],
        around,
      )}
    >
      {left && <div>{left}</div>}
      <input
        id={name}
        autoComplete="off"
        className={twMerge([
          'flex-1 py-1 2xl:py-2 text-sm 2xl:text-lg text-slate-50 focus:outline-none',
          className,
        ])}
        {...register(name)}
        {...rest}
      />
      {right && <div>{right}</div>}
    </div>
  )
}

export { Input }
