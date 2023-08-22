'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import * as Popover from '@radix-ui/react-popover'

import { MoreHorizontal, Settings, Trash2, X } from 'lucide-react'

import {
  PostCommentDTO,
  useDeleteCommentReaction,
  useGetCommentReactions,
} from '@/queries/comment.query'
import { useUserStore } from '@/stores/user.store'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from './Button'
import { Error } from './Error'
import { ManageReaction } from './ManageReaction'
import { Text } from './Text'
import { Title } from './Title'
import { UserAvatar } from './UserAvatar'

interface CommentCardOptionsProps {
  handleRemoveComment: () => void
  comment: PostCommentDTO
}

const CommentCardOptions = ({
  handleRemoveComment,
  comment,
}: CommentCardOptionsProps) => {
  const [managePostDialogOpen, setManagePostDialogOpen] = useState(false)
  const [removePostDialogOpen, setRemoveCommentDialogOpen] = useState(false)

  return (
    <Dialog.Root open={managePostDialogOpen}>
      <AlertDialog.Root open={removePostDialogOpen}>
        <Popover.Root>
          <Popover.Trigger className="text-zinc-600 rounded-md dark:text-slate-50 w-fit flex items-center h-full bg-transparent cursor-pointer p-1 ml-3 dark:hover:bg-dark-slate-gray-400 hover:bg-slate-200">
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
                  Gerenciar reações
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed h-full top-[50%] left-[50%] max-h-[75vh] w-full max-w-[70vw] translate-x-[-50%] translate-y-[-50%] bg-slate-100 dark:bg-rich-black-500 rounded-xl overflow-hidden data-[state=open]:animate-contentShow">
                  <Dialog.Title className="text-xl font-bold w-full pt-8 px-8">
                    <Title className="text-left">Gerenciar comentário</Title>
                  </Dialog.Title>
                  <Dialog.Description className="px-8 w-full">
                    <Text className="text-left">
                      Gerencie as reações do comentário.
                    </Text>
                  </Dialog.Description>
                  <div className="flex flex-col items-center justify-start p-8 w-full max-h-full h-[60vh] gap-8">
                    <ManageComment comment={comment} />
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
                onClick={() => setRemoveCommentDialogOpen(true)}
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
                    <Title className="text-left">Excluir comentário</Title>
                  </AlertDialog.Title>
                  <AlertDialog.Description asChild className="px-8 w-full">
                    <Text className="text-left pt-2">
                      Essa ação não poderá ser desfeita. Tem certeza que deseja
                      excluir esse comentário?
                    </Text>
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-4 px-8">
                    <AlertDialog.Cancel
                      className="p-2"
                      asChild
                      onClick={() => {
                        setRemoveCommentDialogOpen(false)
                      }}
                    >
                      <Button className="w-[20%]">Cancelar</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action
                      asChild
                      onClick={() => {
                        handleRemoveComment()
                        setRemoveCommentDialogOpen(false)
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

interface ManageCommentProps {
  comment: PostCommentDTO
}

const ManageComment = ({ comment }: ManageCommentProps) => {
  const { userInfo } = useUserStore((state) => state)
  const [reactionId, setReactionId] = useState<string | undefined>(undefined)

  const {
    data,
    isLoading: isLoadingReactions,
    isError: isErrorReactions,
    refetch: refetchReactions,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetCommentReactions({
    commentId: comment.id,
    token: userInfo?.token || '',
  })

  const { data: deleteReaction, isError: errorDeleteReaction } =
    useDeleteCommentReaction({
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

    refetchReactions()
  }, [reactionId, deleteReaction])

  if (isLoadingReactions) return <Text>Loading...</Text>

  if (isErrorReactions || data === undefined)
    return <Error message="Erro ao carregar reações" />

  const reactions = data.pages.flatMap((page) => page)

  return (
    <div className="h-full w-full max-w-lg flex flex-col items-center justify-center gap-2">
      <div className="w-full h-fit">
        <div className="flex flex-row gap-2 py-1 w-full items-center justify-center">
          <div className="w-11 h-10">
            <UserAvatar
              exibitionName={comment.user?.username || ''}
              userImage={comment.user?.profilePicture || ''}
            />
          </div>
          <Text className="text-base text-start text-zinc-500 dark:text-zinc-300">
            @{comment.user?.username}
          </Text>
        </div>
        <Text className="text-start text-sm pl-2">{comment.content}</Text>
      </div>
      <ManageReaction
        setReactionId={setReactionId}
        reactions={reactions}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoadingReactions}
      />
    </div>
  )
}

export { CommentCardOptions }
