import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

const Title = ({ children, className, ...rest }: TitleProps) => {
  return (
    <h2
      className={twMerge([
        'font-bold text-3xl text-zinc-800 dark:text-slate-50 w-full text-center',
        className,
      ])}
      {...rest}
    >
      {children}
    </h2>
  )
}

export { Title }
