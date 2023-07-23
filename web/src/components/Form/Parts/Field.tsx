import { HTMLAttributes } from 'react'

type FieldProps = HTMLAttributes<HTMLDivElement>

const Field = (props: FieldProps) => {
  return <div className="flex flex-col gap-1" {...props} />
}

export { Field }

