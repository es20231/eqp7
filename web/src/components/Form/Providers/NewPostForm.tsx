'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../Parts'

const createNewPostFormSchema = z.object({
  subtitle: z
    .string()
    .nonempty('Coloque uma legenda para o post')
    .max(1000, 'A legenda pode ter no máximo de 1000 caracteres'),
  userId: z.string().cuid(),
  imageId: z.string().cuid(),
})

export type CreateNewPostFormData = z.infer<typeof createNewPostFormSchema>

interface NewPostFormProviderProps {
  children: ReactNode
  userId: string
  imageId: string
}

const NewPostFormProvider = ({
  children,
  userId,
  imageId,
}: NewPostFormProviderProps) => {
  const createNewPostForm = useForm<CreateNewPostFormData>({
    resolver: zodResolver(createNewPostFormSchema),
    defaultValues: {
      userId,
      imageId,
    },
  })

  return <FormProvider {...createNewPostForm}>{children}</FormProvider>
}

const NewPostFormComponent = () => {
  return (
    <form className="w-full">
      <Form.Field>
        <Form.Label className="text-xl">Legenda:</Form.Label>
        <Form.TextArea
          className="bg-slate-100 dark:bg-dark-slate-gray-500 shadow-none text-zinc-800 dark:text-slate-50 h-[25vh]"
          around="dark:bg-dark-slate-gray-500 bg-slate-100"
          name="subtitle"
          placeholder="Dê uma legenda ao seu novo post"
        />
        <Form.ErrorMessage field="subtitle" />
      </Form.Field>
    </form>
  )
}

export { NewPostFormComponent, NewPostFormProvider }
