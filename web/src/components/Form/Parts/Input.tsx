'use client'

import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

const Input = ({ name, type, right, className, ...rest }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <input
      id={name}
      type={type}
      right={right}
      className={`flex-1 w-full bg-dark-slate-gray text-white placeholder:text-slate-400 rounded shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:gray-50 ${
        errors[name] ? 'ring-2 ring-red-500' : ''
      } ${className}`}
      {...register(name)}
      {...rest}
      autoComplete="off"
    />
  )
}
export { Input }

