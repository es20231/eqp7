import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type FieldProps = HTMLAttributes<HTMLDivElement>

const Field = ({ className, ...rest }: FieldProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col gap-1 w-full rounded-md bg-slate-100 dark:bg-rich-black-500',
        className,
      )}
      {...rest}
    />
  )
}

export { Field }
