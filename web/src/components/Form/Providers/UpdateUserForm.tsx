'use client'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { UserAvatar } from '@/components/UserAvatar'
import { formatName } from '@/components/UserPresentation'
import { useUpdateUser } from '@/mutations/user.mutation'
import { UserDTO } from '@/queries/user.query'
import { api } from '@/services/axios'
import { useUserStore } from '@/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, PencilLine, UserCheck2 } from 'lucide-react'
import { ReactNode, useCallback, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { Form } from '../Parts'

const createUpdateUserFormSchema = z.object({
  fullName: z.string().optional(),
  biography: z.string().optional(),
  profilePicture: z.string().optional(),
})

type CreateUpdateUserFormData = z.infer<typeof createUpdateUserFormSchema>

interface UpdateUserFormProviderProps {
  children: ReactNode
  user: UserDTO
}

const UpdateUserFormProvider = ({
  children,
  user,
}: UpdateUserFormProviderProps) => {
  const createUpdateUserForm = useForm<CreateUpdateUserFormData>({
    resolver: zodResolver(createUpdateUserFormSchema),
    defaultValues: {
      fullName: user.fullName,
      biography: user.biography,
    },
  })

  return <FormProvider {...createUpdateUserForm}>{children}</FormProvider>
}

interface UpdateUserFormComponentProps {
  token: string
  user: UserDTO
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateUserFormComponent = ({
  token,
  user,
  setIsOpen,
}: UpdateUserFormComponentProps) => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit } = useFormContext<CreateUpdateUserFormData>()

  const { setUserInfo } = useUserStore((state) => state)

  const { mutateAsync: mutate } = useUpdateUser()

  const updateUser = async (
    data: CreateUpdateUserFormData,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    url?: string,
  ) => {
    await mutate(
      {
        token,
        user: {
          id: user.id,
          biography: data.biography || undefined,
          fullName: data.fullName || undefined,
          profilePicture: url || undefined,
        },
      },
      {
        onSuccess: (res) => {
          console.log('res', res)
          toast.success('Perfil atualizado com sucesso!')
          setUserInfo({ ...res, token })
          setIsOpen(false)
        },
        onError: (err: any) => {
          console.log('err', err)
          toast.error(
            err.response.data.message || 'Erro ao atualizar o perfil.',
          )
        },
      },
    )
  }

  const handleUpdateUser = handleSubmit(async (data) => {
    setIsLoading(true)
    if (file) {
      const formData = new FormData()

      formData.append('file', file)
      formData.append('userId', user.id)

      await api(token)
        .post('images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(async (response) => {
          console.log(response)
          await updateUser(
            data,
            setIsOpen,
            response.data.payload.url || undefined,
          )
        })
        .catch((error: any) => {
          console.log(error)
          return toast.error(
            error.response.data.message ||
              'Erro ao atualizar a imagem de perfil.',
          )
        })
    } else {
      await updateUser(data, setIsOpen)
    }
    setIsLoading(false)
  })

  return (
    <div className="grid grid-cols-[40%_1fr] gap-4 w-full h-full items-center justify-start">
      <div className="w-60 h-60 mx-24">
        <ChangeProfilePicture
          name={formatName(user.fullName)}
          imageUrl={user.profilePicture || undefined}
          setFile={setFile}
        />
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <form className="h-full w-full flex flex-col items-center justify-center gap-2">
          <Form.Field>
            <Form.Label>Nome completo</Form.Label>
            <Form.Input
              around="dark:bg-dark-slate-gray-500 bg-gray-200"
              className="bg-transparent text-zinc-800 dark:text-slate-50"
              name="fullName"
            />
            <Form.ErrorMessage field="fullName" />
          </Form.Field>
          <Form.Field>
            <Form.Label>Biografia</Form.Label>
            <Form.TextArea
              around="dark:bg-dark-slate-gray-500 bg-gray-200"
              className="bg-transparent text-zinc-800 dark:text-slate-50 h-28 max-h-28 2xl:h-40 2xl:max-h-40"
              name="biography"
            />
            <Form.ErrorMessage field="biography" />
          </Form.Field>
          <Button
            rightIcon={
              isLoading ? (
                <Loader2 className="text-slate-50 animate-spin" size={24} />
              ) : (
                <UserCheck2 className="text-slate-50" size={24} />
              )
            }
            className="max-w-[40%] 2xl:max-w-[30%] self-end"
            onClick={handleUpdateUser}
          >
            Salvar
          </Button>
        </form>
      </div>
    </div>
  )
}

interface ChangeProfilePictureProps {
  name: string
  imageUrl: string | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

const ChangeProfilePicture = ({
  name,
  imageUrl,
  setFile,
}: ChangeProfilePictureProps) => {
  const [image, setImage] = useState('')
  const [error, setError] = useState('')

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 1) return

      if (fileRejections.length > 0) {
        setError('Selecione apenas imagens. (png, jpg, jpeg)')
        return setTimeout(() => setError(''), 3000)
      }

      const file = acceptedFiles[0]

      if (file.size / 1024 / 1024 > 10) {
        setError('A imagem deve ter no máximo 10MB.')
        return setTimeout(() => setError(''), 3000)
      }

      setImage(URL.createObjectURL(file))
      setFile(file)
    },
    [],
  )

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    onDrop,
  })

  return (
    <div
      {...getRootProps({ className: 'dropzone' })}
      className="h-full w-full flex flex-col items-center justify-center"
    >
      <input {...getInputProps()} />
      <div className="flex gap-4 w-full items-center justify-center h-full">
        <div
          className={twMerge(
            'w-56 h-56 cursor-pointer dark:hover:bg-dark-slate-gray-500 hover:bg-slate-200 rounded-2xl p-4 relative',
            error && 'border-2 border-red-500',
          )}
        >
          <UserAvatar
            userImage={image || imageUrl || ''}
            exibitionName={name}
            width={224}
            height={224}
          />
          <PencilLine
            className="dark:text-slate-50 text-zinc-800 absolute bottom-2 right-2"
            size={20}
          />
          <Text className="text-red-500 dark:text-red-500 text-xs -bottom-10 absolute">
            {error}
          </Text>
        </div>
      </div>
    </div>
  )
}

export { UpdateUserFormComponent, UpdateUserFormProvider }
