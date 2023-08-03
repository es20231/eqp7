'use client'

import {
  RegisterFormComponent,
  RegisterFormProvider,
} from '@/components/Form/Providers/RegisterForm'
import { Logo } from '@/components/Logo'
import { Text } from '@/components/Text'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Title } from '@/components/Title'
import { Waves } from '@/components/Waves'

const Register = () => {
  return (
    <div className="bg-slate-200 dark:bg-rich-black-500 mb-40 w-full h-full flex flex-col items-center justify-center">
      <ThemeSwitch />
      <section className="flex flex-col gap-5">
        <Logo width={300} height={300} />
        <Title className="text-5xl">Cadastrar</Title>
        <div className="w-full text-center flex flex-col items-center justify-center">
          <Text className="text-xl font-medium">
            <i>Registre-se</i> e descubra no comum o que é
          </Text>
          <span className="text-pacific-blue-500 font-semibold italic text-2xl">
            Extraordinário
          </span>
        </div>
      </section>
      <RegisterFormProvider>
        <RegisterFormComponent />
      </RegisterFormProvider>

      <Waves />
    </div>
  )
}

export default Register
