import { LabelHTMLAttributes } from 'react'

const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className="right text-sm text-dark-slate-gray flex items-center justify-between"
      {...props}
    />
  )
}

export { Label }

