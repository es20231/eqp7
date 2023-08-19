'use client'

import { Error } from '@/components/Error'
import { useCreatePost } from '@/mutations/post.mutation'
import { useDeleteImage } from '@/queries/image.query'
import { UserImagesDTO, useGetUserImages } from '@/queries/user.query'
import { queryClient } from '@/services/queryClient'
import * as Dialog from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Check, ImageOff, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from './Button'
import {
  CreateNewPostFormData,
  NewPostFormComponent,
  NewPostFormProvider,
} from './Form/Providers/NewPostForm'
import { ImageCardOptions } from './ImageCardOptions'
import { Text } from './Text'
import { Title } from './Title'

interface UserImagesProps {
  userId: string
  token: string
  preview?: boolean
}

const UserImages = ({ userId, token, preview = false }: UserImagesProps) => {
  const { data, isLoading, isError } = useGetUserImages({ token, userId })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError || !data)
    return <Error message="Ocorreu um erro ao carregar as imagens do usuário" />

  const userImages = preview ? data.slice(0, 5) : data

  return (
    <ScrollArea.Root className="w-full h-[85%]">
      <ScrollArea.Viewport className="w-full h-full py-3 px-4">
        {userImages.length ? (
          <div className="grid grid-cols-3 2xl:grid-cols-5 gap-4 w-full">
            {userImages.map((image) => (
              <NewPostFormProvider
                key={image.id}
                imageId={image.id}
                userId={image.userId}
              >
                <ImageCard image={image} token={token} />
              </NewPostFormProvider>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-4 pt-10">
            <ImageOff
              className="text-zinc-600 dark:text-slate-50"
              size={64}
              strokeWidth={1.5}
            />
            <Text className="text-center">
              Você ainda não possui imagens, que tal enviar uma?
            </Text>
          </div>
        )}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}

interface ImageCardProps {
  image: UserImagesDTO
  token: string
}

const ImageCard = ({ image, token }: ImageCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const { handleSubmit, reset } = useFormContext<CreateNewPostFormData>()

  const { mutate: createPost } = useCreatePost()

  const handleCreateNewPost = handleSubmit(({ imageId, subtitle, userId }) => {
    createPost(
      { post: { imageId, subtitle, userId }, token },
      {
        onSuccess: () => {
          toast.success('Post criado com sucesso')
          queryClient.invalidateQueries(['posts', { userId, token }])
          setIsOpen(false)
        },
        onError: (err: any) => {
          console.log('post create error', err)
          toast.error(err.response.data.message || 'Erro ao criar post')
        },
      },
    )
    reset()
  })

  const { refetch: deleteImage } = useDeleteImage({ imageId: image.id, token })

  const handleDeleteImage = async () => {
    const { error }: { error: any } = await deleteImage()
    if (!error) toast.success('Imagem deletada com sucesso!')
    else toast.error(error.response.data.message || 'Erro ao deletar imagem')
    queryClient.invalidateQueries(['images', { userId: image.userId, token }])
  }

  return (
    <div className="flex flex-col gap-2 max-w-[15rem]">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <figure className={`filter-${image.filter}`}>
          <Image
            alt="user image"
            src={image.url}
            width={300}
            height={300}
            className="object-cover w-64 h-64"
            unoptimized
          />
        </figure>
      </div>
      <div className="w-full h-fit flex flex-row gap-2">
        <Dialog.Root open={isOpen}>
          <Dialog.Trigger asChild>
            <Button onClick={() => setIsOpen(true)}>Criar post</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
            <Dialog.Content className="fixed h-full top-[50%] left-[50%] max-h-[75vh] w-full max-w-[70vw] translate-x-[-50%] translate-y-[-50%] bg-slate-100 dark:bg-rich-black-500 rounded-xl overflow-hidden data-[state=open]:animate-contentShow">
              <Dialog.Title className="text-xl font-bold w-full pt-8 px-8">
                <Title className="text-left">Criar post</Title>
              </Dialog.Title>
              <Dialog.Description className="px-8 w-full">
                <Text className="text-left">
                  Você está prestes a criar um post com a imagem abaixo.
                </Text>
              </Dialog.Description>
              <div className="flex flex-col items-center justify-start p-8 w-full max-h-full h-[60vh]">
                <div className="flex items-center justify-evenly w-full h-full gap-8">
                  <div className="overflow-hidden rounded-lg shadow-lg w-[40vw] h-[40vh]">
                    <figure className={`filter-${image.filter} h-full w-full`}>
                      <Image
                        alt="user image"
                        key={image.id}
                        src={image.url}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </figure>
                  </div>
                  <div className="w-full text-center flex flex-col items-end justify-end gap-4">
                    <NewPostFormComponent />
                    <Dialog.Close asChild>
                      <Button
                        onClick={handleCreateNewPost}
                        className="w-[20%]"
                        rightIcon={
                          <Check
                            className="text-slate-50"
                            size={20}
                            strokeWidth={1.5}
                          />
                        }
                      >
                        Postar
                      </Button>
                    </Dialog.Close>
                  </div>
                </div>
              </div>
              <Dialog.Close
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 p-2"
              >
                <X />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <ImageCardOptions handleDeleteImage={handleDeleteImage} image={image} />
      </div>
    </div>
  )
}

export { UserImages }
