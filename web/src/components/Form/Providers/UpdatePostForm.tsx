import { Button } from '@/components/Button'
import { useUpdatePost } from '@/mutations/post.mutation'
import { UserPostDTO } from '@/queries/post.query'
import { queryClient } from '@/services/queryClient'
import { useUserStore } from '@/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form } from '../Parts'

const createUpdatePostFormSchema = z.object({
  subtitle: z.string().optional(),
})

type CreateUpdatePostFormData = z.infer<typeof createUpdatePostFormSchema>

interface UpdatePostFormProviderProps {
  children: ReactNode
  post: UserPostDTO
}

const UpdatePostFormProvider = ({
  children,
  post,
}: UpdatePostFormProviderProps) => {
  const createUpdatePostForm = useForm<CreateUpdatePostFormData>({
    resolver: zodResolver(createUpdatePostFormSchema),
    defaultValues: {
      subtitle: post.subtitle,
    },
  })

  return <FormProvider {...createUpdatePostForm}>{children}</FormProvider>
}

interface UpdatePostFormComponentProps {
  post: UserPostDTO
}

const UpdatePostFormComponent = ({ post }: UpdatePostFormComponentProps) => {
  const { userInfo } = useUserStore((state) => state)

  const { handleSubmit } = useFormContext<CreateUpdatePostFormData>()

  const { mutate } = useUpdatePost()

  const handleUpdatePost = handleSubmit(
    async ({ subtitle }: CreateUpdatePostFormData) => {
      await mutate(
        {
          post: {
            subtitle: subtitle || post.subtitle,
            id: post.id,
          },
          token: userInfo?.token || '',
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              'posts',
              { userId: userInfo?.id, token: userInfo?.token },
            ])
            toast.success('Post atualizado com sucesso!')
          },
          onError: (err: any) => {
            console.log(err)
            toast.error(err.reponse.data.message || 'Erro ao atualizar post')
          },
        },
      )
    },
  )

  return (
    <form className="w-full h-full flex flex-row items-center justify-between py-4 gap-4 px-8">
      <div className="h-56 w-56 rounded-md grow">
        <Image
          alt="Post image"
          src={post.image.url}
          width={224}
          height={224}
          className="object-cover h-full w-full rounded-md"
        />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <Form.Field>
          <Form.Label>Legenda:</Form.Label>
          <Form.Input
            placeholder="Digite a legenda do post"
            name="subtitle"
            around="bg-dark-slate-gray-400"
            className="bg-dark-slate-gray-400"
          />
          <Form.ErrorMessage field="subtitle" />
        </Form.Field>
        <Button
          onClick={handleUpdatePost}
          rightIcon={<Check className="text-slate-50" size={20} />}
          className="max-w-[30%] self-end"
        >
          Salvar
        </Button>
      </div>
    </form>
  )
}

export { UpdatePostFormComponent, UpdatePostFormProvider }
