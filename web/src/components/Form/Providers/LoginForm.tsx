'use client'

import { Button } from '@/components/Button'
import { Form } from '@/components/Form/Parts'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CircleNotch } from 'phosphor-react'
import { ReactNode, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

import { z } from 'zod'

const createLoginSchema = z.object({
  email: z
    .string()
    .nonempty('Nome de usuário obrigatório')
    .email('Digite um nome de usuário válido'),
  password: z.string().nonempty('Senha obrigatória').min(8, 'Senha incorreta'),
})
type CreateLoginData = z.infer<typeof createLoginSchema>

interface LoginFormProviderProps {
  children: ReactNode
}

const LoginFormProvider = ({ children }: LoginFormProviderProps) => {
  const createLoginForm = useForm<CreateLoginData>({
    resolver: zodResolver(createLoginSchema),
  })

  return <FormProvider {...createLoginForm}>{children}</FormProvider>
}

const LoginFormComponent = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState<CreateLoginData | undefined>(
    undefined,
  )

  const { handleSubmit, reset } = useFormContext()

  const handleLogin = handleSubmit(async (data) => {
    setLoading(true)
    if (typeof window !== 'undefined') {
      await signIn('credentials', {
        username: data.user,
        password: data.password,
        redirect: false,
      })
        .then((res) => {
          if (res?.error === 'CredentialsSignin') {
            toast.error('Usuário ou senha incorretos')
            return
          }

          if (res?.ok && !res.error) {
            router.push('/')
            toast.success('Login feito com sucesso')
          }
        })
        .catch((err) => {
          toast.error('Erro ao fazer login')
          return console.error(err)
        })
        .finally(() => {
          reset()
          setLoading(false)
        })
    }
  })

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-2 min-w-[20rem]  pb-20"
    >
      <Form.Field>
        <Form.Input name="Usuário" placeholder="Usuário" />
        <Form.ErrorMessage field="user" />
      </Form.Field>
      <Form.Field>
        <Form.Input name="password" type="password" placeholder="Senha" />
        <Form.ErrorMessage field="password" />
      </Form.Field>

      <div className="flex flex-row justify-between">
        <p
          className="hover:cursor-pointer hover:opacity-75 text-dark-slate-gray text-sm right-0"
          onClick={() => router.push('/auth/register')}
        >
          Registre-se
        </p>
      </div>
      {!loading ? (
        <Button onClick={handleLogin}>Login</Button>
      ) : (
        <div className="flex w-full items-center justify-center rounded bg-chocolate-500 py-2 sm:w-[40%] sm:self-end">
          <CircleNotch className="animate-spin text-white" size={24} />
        </div>
      )}
    </form>
  )
}

export { LoginFormComponent, LoginFormProvider }

