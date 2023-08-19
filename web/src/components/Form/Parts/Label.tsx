import { LabelHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const Label = ({
  className,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={twMerge(
        'flex items-center justify-between text-sm 2xl:text-base text-zinc-800 dark:text-slate-50',
        className,
      )}
      {...rest}
    />
  )
}

export { Label }
