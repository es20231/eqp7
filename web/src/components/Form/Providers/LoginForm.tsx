'use client'

import { Form } from '@/components/Form/Parts'
import { zodResolver } from '@hookform/resolvers/zod'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CircleNotch, Eye, EyeClosed } from 'phosphor-react'
import { ReactNode, useCallback, useState } from 'react'
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
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevState) => !prevState)
  }, [setShowPassword])

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
          console.log(res)
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
        <Form.ErrorMessage className="text-sm" field="user" />
      </Form.Field>
      <Form.Field>
        <Form.Input
          name="password"
          type="password"
          placeholder="Senha"
          type={showPassword ? 'text' : 'password'}
          right={
            <div
              className="flex items-center justify-center p-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <Eye className="text-gray-600" size={20} strokeWidth={1.5} />
              ) : (
                <EyeClosed
                  className="text-gray-600"
                  size={20}
                  strokeWidth={1.5}
                />
              )}
            </div>
          }
        />
        <Form.ErrorMessage className="text-sm" field="password" />
      </Form.Field>

      <div className="flex flex-row justify-between">
        <Form.Checkbox name="manterConectado" type="checkbox" />
        <Form.Label>Esqueceu a senha?</Form.Label>
      </div>
      {!loading ? (
        <Form.Button onClick={handleLogin}>Login</Form.Button>
      ) : (
        <div className="flex w-full items-center justify-center rounded bg-chocolate-500 py-2 sm:w-[40%] sm:self-end">
          <CircleNotch className="animate-spin text-white" size={24} />
        </div>
      )}
    </form>
  )
}

export { LoginFormComponent, LoginFormProvider }

