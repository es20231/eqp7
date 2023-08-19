'use client'

import { Button } from '@/components/Button'
import { useUpdateUser } from '@/mutations/user.mutation'
import { api } from '@/services/axios'
import { useUserStore } from '@/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Eye, EyeOff } from 'lucide-react'
import { ReactNode, useCallback, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../Parts'

const createChangePasswordFormSchema = z
  .object({
    currentPassword: z.string().nonempty('Digite a sua senha atual'),
    newPassword: z
      .string()
      .nonempty('Digite a sua nova senha')
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmNewPassword: z.string().nonempty('Confirme a sua nova senha'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  })

type CreateChangePasswordFormData = z.infer<
  typeof createChangePasswordFormSchema
>

interface ChangePasswordFormProviderProps {
  children: ReactNode
}

const ChangePasswordFormProvider = ({
  children,
}: ChangePasswordFormProviderProps) => {
  const createChangePasswordForm = useForm<CreateChangePasswordFormData>({
    resolver: zodResolver(createChangePasswordFormSchema),
  })

  return <FormProvider {...createChangePasswordForm}>{children}</FormProvider>
}

const ChangePasswordFormComponent = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  const toggleCurrentPasswordVisibility = useCallback(() => {
    setShowCurrentPassword((state) => !state)
  }, [setShowCurrentPassword])

  const toggleNewPasswordVisibility = useCallback(() => {
    setShowNewPassword((state) => !state)
  }, [setShowNewPassword])

  const toggleConfirmNewPasswordVisibility = useCallback(() => {
    setShowConfirmNewPassword((state) => !state)
  }, [setShowConfirmNewPassword])

  const { handleSubmit, reset } = useFormContext<CreateChangePasswordFormData>()

  const { mutate } = useUpdateUser()
  const { userInfo } = useUserStore((state) => state)

  const handleChangePassword = handleSubmit(
    async (data: CreateChangePasswordFormData) => {
      await api()
        .post('/auth/login', {
          username: userInfo?.username,
          password: data.currentPassword,
        })
        .then(() => {
          mutate(
            {
              user: {
                password: data.newPassword,
                id: userInfo?.id,
              },
              token: userInfo?.token || '',
            },
            {
              onSuccess: () => {
                toast.success('Senha alterada com sucesso')
              },
              onError: (err: any) => {
                console.log('ChangePasswordError:', err)
                toast.error(
                  err.response.data.message ||
                    'Ocorreu um erro ao tentar alterar a sua senha',
                )
              },
              onSettled: () => reset(),
            },
          )
        })
        .catch((err) => {
          console.log('ChangePasswordLoginError:', err)
          if (err.response.data.message.includes('Invalid credentials')) {
            toast.error('Senha atual incorreta')
          } else {
            toast.error(
              err.response.data.message ||
                'Ocorreu um erro ao tentar alterar a sua senha',
            )
          }
        })
    },
  )

  return (
    <form className="w-full max-w-[60%] h-full max-h-[70%] mx-auto flex flex-col items-center justify-center gap-3">
      <Form.Field>
        <Form.Label>Senha atual</Form.Label>
        <Form.Input
          type={showCurrentPassword ? 'text' : 'password'}
          placeholder="Digite a sua senha atual"
          around="dark:bg-dark-slate-gray-500 bg-gray-200"
          className="bg-transparent text-zinc-800 dark:text-slate-50"
          name="currentPassword"
          right={
            showCurrentPassword ? (
              <Eye onClick={toggleCurrentPasswordVisibility} />
            ) : (
              <EyeOff onClick={toggleCurrentPasswordVisibility} />
            )
          }
        />
        <Form.ErrorMessage field="currentPassword" />
      </Form.Field>
      <Form.Field>
        <Form.Label>Nova senha</Form.Label>
        <Form.Input
          type={showNewPassword ? 'text' : 'password'}
          placeholder="Digite sua nova senha"
          name="newPassword"
          around="dark:bg-dark-slate-gray-500 bg-gray-200"
          className="bg-transparent text-zinc-800 dark:text-slate-50"
          right={
            showNewPassword ? (
              <Eye onClick={toggleNewPasswordVisibility} />
            ) : (
              <EyeOff onClick={toggleNewPasswordVisibility} />
            )
          }
        />
        <Form.ErrorMessage field="newPassword" />
      </Form.Field>
      <Form.Field>
        <Form.Label>Confirme a sua nova senha</Form.Label>
        <Form.Input
          type={showConfirmNewPassword ? 'text' : 'password'}
          placeholder="Confirme sua nova senha"
          name="confirmNewPassword"
          around="dark:bg-dark-slate-gray-500 bg-gray-200"
          className="bg-transparent text-zinc-800 dark:text-slate-50"
          right={
            showConfirmNewPassword ? (
              <Eye onClick={toggleConfirmNewPasswordVisibility} />
            ) : (
              <EyeOff onClick={toggleConfirmNewPasswordVisibility} />
            )
          }
        />
        <Form.ErrorMessage field="confirmNewPassword" />
      </Form.Field>
      <Button
        className="self-end w-fit"
        rightIcon={<Check />}
        onClick={handleChangePassword}
      >
        Salvar
      </Button>
    </form>
  )
}

export { ChangePasswordFormComponent, ChangePasswordFormProvider }
