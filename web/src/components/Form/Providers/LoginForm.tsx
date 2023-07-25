'use client'

import { Button } from '@/components/Button'
import { Form } from '@/components/Form/Parts'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useCallback, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const createLoginFormSchema = z.object({
  username: z.string().nonempty('O usuário é obrigatório'),
  password: z.string().nonempty('A senha é obrigatória'),
})

type createLoginFormData = z.infer<typeof createLoginFormSchema>

interface LoginFormProviderProps {
  children: ReactNode
}

const LoginFormProvider = ({ children }: LoginFormProviderProps) => {
  const createLoginForm = useForm<createLoginFormData>({
    resolver: zodResolver(createLoginFormSchema),
  })

  return <FormProvider {...createLoginForm}>{children}</FormProvider>
}

const LoginFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((state) => !state)
  }, [])

  const { handleSubmit } = useFormContext<createLoginFormData>()

  const handleClickLoginButton = handleSubmit(
    async ({ username, password }) => {
      signIn('credentials', {
        username,
        password,
        redirect: false,
      })
        .then((res) => {
          console.log('login res', res)
          if (res && res.error && res.error === 'CredentialsSignin') {
            toast.error('Usuário ou senha inválidos')
            return
          }

          if (res && res.error) {
            toast.error('Erro ao realizar login')
            return
          }

          if (res && !res.error && res.ok) {
            toast.success('Login realizado com sucesso')
            router.push('/dashboard')
          }
        })
        .catch((err) => {
          console.log('login err', err)
        })
    },
  )

  return (
    <form className="w-full mt-4 px-4 flex flex-col items-center justify-center gap-2 max-w-2xl">
      <Form.Field>
        <Form.Input
          name="username" // macth with the error message field
          placeholder="Usuário"
          className="bg-dark-slate-gray-500 placeholder:text-gray-300"
          around="bg-dark-slate-gray-500"
        />
        <Form.ErrorMessage field="username" />
      </Form.Field>
      <Form.Field>
        <Form.Input
          name="password" // macth with the error message field
          placeholder="Senha"
          className="bg-dark-slate-gray-500 placeholder:text-zinc-300"
          around="bg-dark-slate-gray-500"
          type={showPassword ? 'text' : 'password'}
          right={
            showPassword ? (
              <EyeOff
                className="text-slate-50 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="text-slate-50 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )
          }
        />
        <Form.ErrorMessage field="password" />
      </Form.Field>
      <Button
        rightIcon={<LogIn className="text-slate-50" />}
        className="mt-4 py-4"
        onClick={handleClickLoginButton}
      >
        Entrar
      </Button>
    </form>
  )
}

export { LoginFormComponent, LoginFormProvider }
