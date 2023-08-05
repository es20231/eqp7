'use client'

import { TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  around?: string
}

const TextArea = ({ name, around, className, ...rest }: TextAreaProps) => {
  const { register } = useFormContext()

  return (
    <div
      className={twMerge(
        [
          'flex flex-row items-center justify-center gap-2 rounded-md px-4 py-2 shadow-sm',
        ],
        around,
      )}
    >
      <textarea
        id={name}
        autoComplete="off"
        className={twMerge([
          'flex-1 py-2 text-lg text-slate-50 focus:outline-none',
          className,
        ])}
        {...register(name)}
        {...rest}
      />
    </div>
  )
}

export { TextArea }
