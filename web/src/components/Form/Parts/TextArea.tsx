'use client'

import { ReactNode, TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  around?: string
  right?: ReactNode
}

const TextArea = ({
  name,
  around,
  right,
  className,
  ...rest
}: TextAreaProps) => {
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
      <textarea
        id={name}
        autoComplete="off"
        className={twMerge([
          'py-1 2xl:py-2 text-sm 2xl:text-lg text-slate-50 focus:outline-none',
          className,
        ])}
        {...register(name)}
        {...rest}
      />
      {right && <div>{right}</div>}
    </div>
  )
}

export { TextArea }
