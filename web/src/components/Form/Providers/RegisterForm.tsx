'use client'

import { Button } from '@/components/Button'
import { Form } from '@/components/Form/Parts'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CircleNotch } from 'phosphor-react'
import { ReactNode, useCallback, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const createRegisterSchema = z.object({
  email: z
    .string()
    .nonempty('Nome de usuário obrigatório')
    .email('Digite um nome de usuário válido'),
  password: z.string().nonempty('Senha obrigatória').min(8, 'Senha incorreta'),
})
type CreateRegisterData = z.infer<typeof createRegisterSchema>

interface RegisterFormProviderProps {
  children: ReactNode
}

const RegisterFormProvider = ({ children }: RegisterFormProviderProps) => {
  const createRegisterForm = useForm<CreateRegisterData>({
    resolver: zodResolver(createRegisterSchema),
  })

  return <FormProvider {...createRegisterForm}>{children}</FormProvider>
}

const RegisterFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevState) => !prevState)
  }, [setShowPassword])

  const [formData, setFormData] = useState<CreateRegisterData | undefined>(
    undefined,
  )

  const { handleSubmit, reset } = useFormContext()

  const handleRegister = handleSubmit(async (data) => {
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
            toast.success('Register feito com sucesso')
          }
        })
        .catch((err) => {
          toast.error('Erro ao fazer Register')
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
      className="flex flex-col gap-2 min-w-[22rem] pb-20 max-w-[22rem]"
    >
      <div className="flex flex-row gap-2">
        <Form.Field>
          <Form.Input name="Nome" placeholder="Nome" />
          <Form.ErrorMessage field="name" />
        </Form.Field>
        <Form.Field>
          <Form.Input name="Sobrenome" placeholder="Sobrenome" />
          <Form.ErrorMessage field="last-name" />
        </Form.Field>
      </div>
      <Form.Field>
        <Form.Input name="Usuário" placeholder="Usuário" />
        <Form.ErrorMessage field="user" />
      </Form.Field>
      <Form.Field>
        <Form.Input name="Email" type="email" placeholder="Email" />
        <Form.ErrorMessage field="email" />
      </Form.Field>
      <Form.Field>
        <Form.Input name="password" placeholder="Senha" type="password" />
        <Form.ErrorMessage field="password" />
      </Form.Field>
      <Form.Field>
        <Form.Input
          name="confirm-password"
          type="password"
          placeholder="Confirme a senha"
        />
        <Form.ErrorMessage field="password" />
      </Form.Field>
      <div className="flex flex-row justify-between">
        <p
          className="hover:cursor-pointer hover:opacity-75 text-dark-slate-gray text-sm right"
          onClick={() => router.push('/auth/login')}
        >
          Já possui cadastro?
        </p>
      </div>
      {!loading ? (
        <Button onClick={handleRegister}>Registrar</Button>
      ) : (
        <div className="flex w-full items-center justify-center rounded bg-chocolate-500 py-2 sm:w-[40%] sm:self-end">
          <CircleNotch className="animate-spin text-white" size={24} />
        </div>
      )}
    </form>
  )
}

export { RegisterFormComponent, RegisterFormProvider }
