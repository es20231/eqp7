'use client'

import { Form } from '@/components/Form'
import { Logo } from '@/components/Logo'
import { Waves } from '@/components/Waves'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const createUserSchema = z.object({
  email: z
    .string()
    .nonempty('Nome de usuário obrigatório')
    .email('Digite um nome de usuário válido'),
  password: z.string().nonempty('Senha obrigatória').min(8, 'Senha incorreta'),
})

type CreateUserData = z.infer<typeof createUserSchema>

export default function Login() {
  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  const { handleSubmit } = createUserForm

  const [formData, setFormData] = useState<CreateUserData | undefined>(
    undefined,
  )

  const handleClickSumbitButton = handleSubmit((data) => {
    setFormData(data)
  })

  return (
    <>
      <div className="flex flex-col gap-8 h-screen w-full items-center justify-center bg-neutral-200">
        <Logo />
        <p className="text-dark-slate-gray">
          Faça login e crie memórias inesquecíveis!
        </p>
        <FormProvider {...createUserForm}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2 min-w-[20rem]  pb-20"
          >
            <Form.Field>
              <Form.Input name="Usuário" placeholder="Usuário" />
              <Form.ErrorMessage field="Usuário" />
            </Form.Field>
            <Form.Field>
              <Form.Input name="password" type="password" placeholder="Senha" />
              <Form.ErrorMessage field="password" />
            </Form.Field>
            <div className="flex flex-row justify-between">
              <Form.Checkbox name="manterConectado" type="checkbox" />
              <Form.Label>Esqueceu a senha?</Form.Label>
            </div>
            <Form.Button onClick={handleClickSumbitButton}>Login</Form.Button>
          </form>
        </FormProvider>
      </div>
      <Waves />
    </>
  )
}
