import { LabelHTMLAttributes } from 'react'

const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className="flex items-center justify-between text-sm text-zinc-600"
      {...props}
    />
  )
}

export { Label }
