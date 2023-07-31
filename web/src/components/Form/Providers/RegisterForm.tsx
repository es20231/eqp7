'use client'

import { Button } from '@/components/Button'
import { Form } from '@/components/Form/Parts'
import { api } from '@/services/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode, useCallback, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const createRegisterFormSchema = z
  .object({
    fullName: z.string().nonempty('O nome completo é obrigatório'),
    username: z.string().nonempty('O nome de usuário é obrigatório'),
    email: z
      .string()
      .nonempty('O email é obrigatório')
      .email('O email é inválido'),
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z
      .string()
      .nonempty('A confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type createRegisterFormData = z.infer<typeof createRegisterFormSchema>

interface RegisterFormProviderProps {
  children: ReactNode
}

const RegisterFormProvider = ({ children }: RegisterFormProviderProps) => {
  const createRegisterForm = useForm<createRegisterFormData>({
    resolver: zodResolver(createRegisterFormSchema),
  })

  return <FormProvider {...createRegisterForm}>{children}</FormProvider>
}

const RegisterFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((state) => !state)
  }, [])

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((state) => !state)
  }, [])

  const { handleSubmit, reset } = useFormContext<createRegisterFormData>()

  const handleClickLoginButton = handleSubmit(async (data) => {
    setLoading(true)
    await api()
      .post('/auth/register', {
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then(async (response) => {
        console.log('response', response)
        toast.success('Usuário cadastrado com sucesso')
        await signIn('credentials', {
          username: data.username,
          password: data.password,
          redirect: false,
        })
          .then((res) => {
            router.push('/dashboard')
          })
          .catch((error) => {
            console.log('error', error)
            toast.error('Erro ao realizar login')
            router.push('/dashboard')
          })
      })
      .catch((error) => {
        const message = error.response.data.message
        if (message.includes('Username')) {
          toast.error('O nome de usuário já existe')
          reset({ username: '' })
        } else if (message.includes('Email')) {
          reset({ email: '' })
          toast.error('O email já existe. Tente outro')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  })

  return (
    <form className="w-full pt-4 px-4 flex flex-col items-center justify-center gap-2 max-w-2xl z-10">
      <Form.Field>
        <Form.Input
          name="fullName" // macth with the error message field
          placeholder="Nome Completo"
          className="bg-dark-slate-gray-500 placeholder:text-gray-300"
          around="bg-dark-slate-gray-500"
        />
        <Form.ErrorMessage field="fullName" />
      </Form.Field>
      <Form.Field>
        <Form.Input
          name="email" // macth with the error message field
          placeholder="Email"
          className="bg-dark-slate-gray-500 placeholder:text-gray-300"
          around="bg-dark-slate-gray-500"
        />
        <Form.ErrorMessage field="email" />
      </Form.Field>
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
      <Form.Field>
        <Form.Input
          name="confirmPassword" // macth with the error message field
          placeholder="Confirme a senha"
          className="bg-dark-slate-gray-500 placeholder:text-zinc-300"
          around="bg-dark-slate-gray-500"
          type={showConfirmPassword ? 'text' : 'password'}
          right={
            showConfirmPassword ? (
              <EyeOff
                className="text-slate-50 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <Eye
                className="text-slate-50 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              />
            )
          }
        />
        <Form.ErrorMessage field="confirmPassword" />
      </Form.Field>
      <Button
        rightIcon={
          !loading ? (
            <LogIn className="text-slate-50" />
          ) : (
            <Loader2 className="animate-spin text-slate-50" />
          )
        }
        className="mt-4 py-4 text-slate-50"
        onClick={handleClickLoginButton}
      >
        Cadastrar
      </Button>
    </form>
  )
}

export { RegisterFormComponent, RegisterFormProvider }
