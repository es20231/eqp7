'use client'

import { HTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

interface ErrorMessageProps extends HTMLAttributes<HTMLSpanElement> {
  field: string
}

const get = (obj: Record<any, any>, path: string) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      )

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)

  return result
}

const ErrorMessage = ({ field, className, ...rest }: ErrorMessageProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const fieldError = get(errors, field)

  if (!fieldError) {
    return null
  }

  return (
    <span className={`mt-1 text-sm text-red-500 ${className}`} {...rest}>
      {fieldError.message?.toString()}
    </span>
  )
}

export { ErrorMessage }
