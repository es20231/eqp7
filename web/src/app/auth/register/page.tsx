'use client'

import {
  RegisterFormComponent,
  RegisterFormProvider,
} from '@/components/Form/Providers/RegisterForm'
import { Logo } from '@/components/Logo'
import { Waves } from '@/components/Waves'

export default function Register() {
  return (
    <>
      <div className="flex flex-col gap-8 h-screen w-full items-center justify-center bg-neutral-200 gap-y-1">
        <Logo />
        <p className="flex text-dark-slate-gray py-5">
          Registre-se e descubra o extraordinário no comum!
        </p>
        <RegisterFormProvider>
          <RegisterFormComponent />
        </RegisterFormProvider>
      </div>
      <Waves />
    </>
  )
}
