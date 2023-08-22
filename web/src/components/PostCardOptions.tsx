'use client'

import {
  UserPostDTO,
  useDeletePostReaction,
  useGetPostReactions,
} from '@/queries/post.query'
import { useUserStore } from '@/stores/user.store'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import * as Popover from '@radix-ui/react-popover'
import * as Tabs from '@radix-ui/react-tabs'
import { MoreHorizontal, Settings, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from './Button'
import { Error } from './Error'
import {
  UpdatePostFormComponent,
  UpdatePostFormProvider,
} from './Form/Providers/UpdatePostForm'
import { ManageReaction } from './ManageReaction'
import { PostComments } from './PostComments'
import { Text } from './Text'
import { Title } from './Title'

interface PostCardOptionsProps {
  handleRemovePost: () => void
  post: UserPostDTO
}

const PostCardOptions = ({ handleRemovePost, post }: PostCardOptionsProps) => {
  const [managePostDialogOpen, setManagePostDialogOpen] = useState(false)
  const [removePostDialogOpen, setRemovePostDialogOpen] = useState(false)

  return (
    <Dialog.Root open={managePostDialogOpen}>
      <AlertDialog.Root open={removePostDialogOpen}>
        <Popover.Root>
          <Popover.Trigger className="text-zinc-600 rounded-md dark:text-slate-50 w-fit flex items-center h-full bg-transparent cursor-pointer p-1 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200">
            <MoreHorizontal />
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              sideOffset={1}
              className="min-w-[220px] bg-gray-300 h-full rounded-md shadow-lg p-4 dark:bg-dark-slate-gray-400 flex flex-col items-center justify-center gap-2 px-3 data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            >
              <Popover.Arrow className="fill-gray-300 dark:fill-dark-slate-gray-400" />
              <Dialog.Trigger asChild>
                <Button
                  className="text-sm 2xl:text-sm rounded-md justify-between"
                  onClick={() => setManagePostDialogOpen(true)}
                  rightIcon={
                    <Settings
                      className="text-slate-50"
                      size={20}
                      strokeWidth={1.7}
                    />
                  }
                >
                  Gerenciar post
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed h-full top-[50%] left-[50%] max-h-[75vh] w-full max-w-[70vw] translate-x-[-50%] translate-y-[-50%] bg-slate-100 dark:bg-rich-black-500 rounded-xl overflow-hidden data-[state=open]:animate-contentShow">
                  <Dialog.Title className="text-xl font-bold w-full pt-8 px-8">
                    <Title className="text-left">Gerenciar post</Title>
                  </Dialog.Title>
                  <Dialog.Description className="px-8 w-full">
                    <Text className="text-left">
                      Gerencie a legenda, suas reações e comentários, além de
                      gerenciar as reações dos comentários.
                    </Text>
                  </Dialog.Description>
                  <div className="flex flex-col items-center justify-start p-8 w-full max-h-full h-[60vh] gap-8">
                    <ManagePost post={post} />
                  </div>
                  <Dialog.Close
                    className="absolute top-8 right-8 p-2"
                    onClick={() => {
                      setManagePostDialogOpen(false)
                    }}
                  >
                    <X />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
              <AlertDialog.Trigger
                asChild
                className="bg-red-400 h-full w-full rounded-md"
                onClick={() => setRemovePostDialogOpen(true)}
              >
                <Button
                  rightIcon={
                    <Trash2
                      className="text-slate-50"
                      size={20}
                      strokeWidth={1.7}
                    />
                  }
                  className="text-sm 2xl:text-sm bg-red-400 hover:bg-red-500/80 justify-between"
                >
                  Excluir
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
                <AlertDialog.Content className="fixed h-fit pb-8 top-[50%] left-[50%] w-full max-w-[40vw] translate-x-[-50%] translate-y-[-50%] bg-slate-100 dark:bg-rich-black-500 rounded-xl overflow-hidden data-[state=open]:animate-contentShow">
                  <AlertDialog.Title
                    asChild
                    className="text-xl font-bold w-full pt-8 px-8"
                  >
                    <Title className="text-left">Excluir post</Title>
                  </AlertDialog.Title>
                  <AlertDialog.Description asChild className="px-8 w-full">
                    <Text className="text-left pt-2">
                      Essa ação não poderá ser desfeita. Tem certeza que deseja
                      excluir esse post?
                    </Text>
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-4 px-8">
                    <AlertDialog.Cancel
                      className="p-2"
                      asChild
                      onClick={() => {
                        setRemovePostDialogOpen(false)
                      }}
                    >
                      <Button className="w-[20%]">Cancelar</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action
                      asChild
                      onClick={() => {
                        handleRemovePost()
                        setRemovePostDialogOpen(false)
                      }}
                    >
                      <Button className="w-[20%] bg-red-400 hover:bg-red-500">
                        Excluir
                      </Button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </AlertDialog.Root>
    </Dialog.Root>
  )
}

interface ManagePostProps {
  post: UserPostDTO
}

const ManagePost = ({ post }: ManagePostProps) => {
  const { userInfo } = useUserStore((state) => state)
  const [reactionId, setReactionId] = useState<string | undefined>(undefined)

  const {
    data,
    isLoading: isPostReactionsLoading,
    isError: isPostReactionsError,
    refetch: refetchPostReactions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPostReactions({ postId: post.id, token: userInfo?.token || '' })

  const { data: deleteReaction, isError: errorDeleteReaction } =
    useDeletePostReaction({
      reactionId,
      token: userInfo?.token || '',
    })

  useEffect(() => {
    if (reactionId) {
      if (deleteReaction) {
        setReactionId(undefined)
        toast.success('Reação removida com sucesso!')
      } else {
        if (errorDeleteReaction) {
          toast.error('Erro ao remover reação')
        }
      }
    }

    refetchPostReactions()
  }, [reactionId, deleteReaction])

  if (isPostReactionsLoading) {
    return <Text>Loading...</Text>
  }

  if (isPostReactionsError || data === undefined) {
    return <Error message="Erro ao carregar reações do post" />
  }

  const postReactions = data.pages.flatMap((page) => page)

  return (
    <Tabs.Root
      className="flex flex-col w-full h-full shadow-sm dark:shadow-dark-slate-gray-400/50 shadow-slate-300"
      defaultValue="edit"
    >
      <Tabs.List className="shrink-0 flex border-b border-dark-slate-gray-400/50">
        <Tabs.Trigger
          className="bg-transparent px-5 h-10 flex-1 flex items-center justify-center leading-none select-none first:rounded-tl-md last:rounded-tr-md outline-none cursor-default data-[state=active]:border-b-2 data-[state=active]:border-pacific-blue-500"
          value="edit"
        >
          <Text>Editar post</Text>
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-transparent px-5 h-10 flex-1 flex items-center justify-center leading-none select-none first:rounded-tl-md last:rounded-tr-md outline-none cursor-default data-[state=active]:border-b-2 data-[state=active]:border-pacific-blue-500"
          value="comments"
        >
          <Text>Comentários</Text>
        </Tabs.Trigger>
        <Tabs.Trigger
          className="bg-transparent px-5 h-10 flex-1 flex items-center justify-center leading-none select-none first:rounded-tl-md last:rounded-tr-md outline-none cursor-default data-[state=active]:border-b-2 data-[state=active]:border-pacific-blue-500"
          value="reactions"
        >
          <Text>Reações</Text>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="edit" asChild>
        <UpdatePostFormProvider post={post}>
          <UpdatePostFormComponent post={post} />
        </UpdatePostFormProvider>
      </Tabs.Content>
      <Tabs.Content value="comments" asChild>
        <div className="w-full h-full flex items-center justify-center mx-auto py-4">
          <PostComments postId={post.id} token={userInfo?.token || ''} />
        </div>
      </Tabs.Content>
      <Tabs.Content value="reactions" asChild>
        <div className="max-w-2xl mx-auto w-full h-full">
          <ManageReaction
            reactions={postReactions}
            setReactionId={setReactionId}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isPostReactionsLoading}
          />
        </div>
      </Tabs.Content>
    </Tabs.Root>
  )
}

export { PostCardOptions }
