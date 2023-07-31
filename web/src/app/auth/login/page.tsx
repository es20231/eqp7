'use client'

import {
  LoginFormComponent,
  LoginFormProvider,
} from '@/components/Form/Providers/LoginForm'
import { Logo } from '@/components/Logo'
import { Text } from '@/components/Text'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { Title } from '@/components/Title'
import { Waves } from '@/components/Waves'

const Login = () => {
  return (
    <div className="bg-slate-200 relative dark:bg-rich-black-500 w-full h-full flex flex-col gap-4 items-center justify-center">
      <ThemeSwitch />
      <section className="flex flex-col gap-5 bg-red">
        <Logo width={300} height={300} />
        <Title className="text-5xl">Entrar</Title>
        <div className="w-full text-center flex flex-col items-center justify-center">
          <Text className="text-xl font-medium">
            Fa&ccedil;a <i>Login</i> e crie memórias
          </Text>
          <span className="text-pacific-blue-500 font-semibold italic text-2xl">
            Inesquecíveis
          </span>
        </div>
      </section>

      <LoginFormProvider>
        <LoginFormComponent />
      </LoginFormProvider>

      <Waves />
    </div>
  )
}

export default Login
