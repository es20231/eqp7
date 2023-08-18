'use client'

import { Button } from '@/components/Button'
import { UserAvatar } from '@/components/UserAvatar'
import { formatName } from '@/components/UserPresentation'
import { useCreateComment } from '@/mutations/comment.mutation'
import { queryClient } from '@/services/queryClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizonal } from 'lucide-react'
import { ReactNode } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../Parts'

const createNewCommentFormSchema = z.object({
  content: z
    .string()
    .nonempty('Digite seu comentário')
    .max(1000, 'A comentário pode ter no máximo de 1000 caracteres'),
  userId: z.string().cuid(),
  postId: z.string().cuid(),
})

export type CreateNewCommentFormData = z.infer<
  typeof createNewCommentFormSchema
>

interface NewCommentFormProviderProps {
  children: ReactNode
  userId: string
  postId: string
}

const NewCommentFormProvider = ({
  children,
  userId,
  postId,
}: NewCommentFormProviderProps) => {
  const createNewCommentForm = useForm<CreateNewCommentFormData>({
    resolver: zodResolver(createNewCommentFormSchema),
    defaultValues: {
      userId,
      postId,
    },
  })

  return <FormProvider {...createNewCommentForm}>{children}</FormProvider>
}

interface NewCommentFormComponentProps {
  fullName: string
  userImage: string
  token: string
}

const NewCommentFormComponent = ({
  fullName,
  userImage,
  token,
}: NewCommentFormComponentProps) => {
  const { handleSubmit, reset } = useFormContext<CreateNewCommentFormData>()

  const { mutate } = useCreateComment()

  const handleComment = handleSubmit(({ content, postId, userId }) => {
    mutate(
      { comment: { content, postId, userId }, token },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries(['comments', { token, postId }])
          toast.success('Comentário criado com sucesso!')
        },
        onError: (err: any) => {
          console.log('Error create comment: ', err)
          toast.error(err.response.data.message || 'Erro ao criar comentário')
        },
        onSettled: () => reset(),
      },
    )
  })

  return (
    <form className="w-full flex items-center justify-center gap-2 px-2 py-1">
      <div className="h-8 w-9">
        <UserAvatar
          exibitionName={formatName(fullName)}
          userImage={userImage}
          height={8}
          width={8}
        />
      </div>
      <Form.Field className="dark:bg-dark-slate-gray-400 bg-slate-100 flex-1">
        <Form.TextArea
          className="overflow-y-hidden resize-none text-sm 2xl:text-sm 2xl:py-1 bg-slate-100 dark:bg-dark-slate-gray-400 shadow-none text-zinc-800 dark:text-slate-50 max-h-7"
          around="dark:bg-dark-slate-gray-400 bg-slate-100 2xl:py-1"
          name="content"
          placeholder="Digite seu comentário"
          right={
            <Button
              className="bg-transparent hover:bg-gray-400/30 dark:hover:bg-dark-slate-gray-500 p-1"
              onClick={handleComment}
            >
              <SendHorizonal
                size={20}
                className="text-zinc-600 dark:text-slate-50"
              />
            </Button>
          }
        />
        <Form.ErrorMessage field="content" />
      </Form.Field>
    </form>
  )
}

export { NewCommentFormComponent, NewCommentFormProvider }
