'use client'

import {
  LoginFormComponent,
  LoginFormProvider,
} from '@/components/Form/Providers/LoginForm'
import { Logo } from '@/components/Logo'
import { Waves } from '@/components/Waves'

export default function Login() {
  return (
    <>
      <div className="flex flex-col gap-8 h-screen w-full items-center justify-center bg-neutral-200">
        <Logo />
        <p className="text-dark-slate-gray">
          Faça login e crie memórias inesquecíveis!
        </p>
        <LoginFormProvider>
          <LoginFormComponent />
        </LoginFormProvider>
      </div>
      <Waves />
    </>
  )
}
