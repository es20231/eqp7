import { HTMLAttributes } from 'react'

type ButtonProps = HTMLAttributes<HTMLDivElement>

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`w-300 h-100 py-2 font-lexend-deca bg-cyan-green-500 mt-8 text-dark-slate-gray rounded shadow hover:bg-cyan-green-400 transition-colors`}
    >
      {props.children}
    </button>
  )
}

export { Button }

