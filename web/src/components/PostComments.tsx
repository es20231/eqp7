'use client'

import {
  PostCommentDTO,
  useDeleteComment,
  useGetPostComments,
} from '@/queries/comment.query'
import { useUserStore } from '@/stores/user.store'
import * as Dialog from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Loader2, MessagesSquare, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from './Button'
import { CommentCardOptions } from './CommentCardOptions'
import { Error } from './Error'
import { ReactionCard } from './ReactionCard'
import { Text } from './Text'
import { Title } from './Title'
import { UserAvatar } from './UserAvatar'

interface PostCommentsProps {
  token: string
  postId: string
  preview?: boolean
}

const PostComments = ({
  token,
  postId,
  preview = false,
}: PostCommentsProps) => {
  const {
    data: comments,
    isLoading,
    isError,
    refetch: refetchComments,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPostComments({ token, postId })

  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loadMoreRef && loadMoreRef.current) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          if (hasNextPage) fetchNextPage()
        }
      })

      intersectionObserver.observe(loadMoreRef.current)

      return () => intersectionObserver.disconnect()
    }
  }, [loadMoreRef, loadMoreRef.current, hasNextPage, fetchNextPage])

  if (isError || comments === undefined) {
    return <Error message="Erro ao carregar os comentários do post" />
  }

  const allComments = comments.pages.flatMap((page) => page)

  const commentsPreview = allComments.slice(0, 2)

  if (preview)
    return (
      <PreviewPostComments
        comments={commentsPreview}
        postId={postId}
        token={token}
      />
    )

  return (
    <div className="w-full h-full max-w-3xl">
      <ScrollArea.Root className="w-full h-[85%]" id="scroll-area">
        <ScrollArea.Viewport className="w-full h-full px-3 pb-4">
          {allComments.length ? (
            <>
              {allComments.map((comment) => (
                <CommentCard
                  comment={comment}
                  key={comment.id}
                  preview={false}
                  token={token}
                  refetchComments={refetchComments}
                />
              ))}
              <div
                ref={loadMoreRef}
                className={
                  !hasNextPage
                    ? 'hidden'
                    : 'h-5 flex items-center justify-center w-full'
                }
              >
                {isFetchingNextPage ? (
                  <Loader2 className="animate-spin text-zinc-800 dark:text-slate-50" />
                ) : null}
              </div>

              {isLoading && <Text className="text-xs">Loading...</Text>}

              {!hasNextPage && !isLoading && (
                <Text className="text-center text-xs italic">
                  Não há mais comentários para carregar
                </Text>
              )}
            </>
          ) : (
            <div className="flex flex-col w-full px-4 items-center justify-center gap-2">
              <MessagesSquare
                className="text-zinc-600 dark:text-slate-50"
                size={28}
              />
              <Text className="text-xs">
                Esse post ainda não contém comentários. Seja o primeiro a
                comentar!
              </Text>
            </div>
          )}
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  )
}

interface PreviewPostCommentsProps {
  comments: PostCommentDTO[]
  postId: string
  token: string
}

const PreviewPostComments = ({
  comments,
  postId,
  token,
}: PreviewPostCommentsProps) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-center px-2 py-2">
      {comments.length ? (
        <>
          {comments.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              token={token}
              preview
              refetchComments={() => ({})}
            />
          ))}

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button className="w-fit self-end p-0 2xl:p-0 pb-1 2xl:pb-1 bg-transparent hover:bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 text-xs 2xl:text-xs italic underline">
                Ver todos os comentários
              </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
              <Dialog.Content className="fixed h-full top-[50%] left-[50%] max-h-[75vh] w-full max-w-[70vw] translate-x-[-50%] translate-y-[-50%] bg-slate-100 dark:bg-rich-black-500 rounded-xl overflow-hidden data-[state=open]:animate-contentShow">
                <Dialog.Title asChild>
                  <Title className="text-left text-xl font-bold w-full pt-8 px-8">
                    Comentários
                  </Title>
                </Dialog.Title>
                <Dialog.Description asChild>
                  <Text className="text-left px-8 w-full">
                    Todos os comentários desse post estão listados abaixo.
                  </Text>
                </Dialog.Description>
                <div className="flex flex-col items-center justify-start p-8 w-full max-h-full h-[60vh] gap-8">
                  <PostComments postId={postId} token={token} />
                </div>
                <Dialog.Close className="absolute top-8 right-8 p-2">
                  <X />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </>
      ) : (
        <div className="flex flex-col w-full px-4 items-center justify-center gap-2">
          <MessagesSquare
            className="text-zinc-600 dark:text-slate-50"
            size={28}
          />
          <Text className="text-xs">
            Esse post ainda não contém comentários. Seja o primeiro a comentar!
          </Text>
        </div>
      )}
    </div>
  )
}

interface CommentCardProps {
  comment: PostCommentDTO
  preview: boolean
  token: string
  refetchComments: () => void
}

const CommentCard = ({
  comment,
  preview,
  token,
  refetchComments,
}: CommentCardProps) => {
  const { userInfo } = useUserStore((state) => state)
  const [commentId, setCommentId] = useState<string | undefined>(undefined)

  const { data: deleteComment, isError: errorDeleteComment } = useDeleteComment(
    { commentId, token },
  )

  useEffect(() => {
    if (commentId) {
      if (deleteComment) {
        setCommentId(undefined)
        toast.success('Comentário deletado com sucesso!')
      } else {
        if (errorDeleteComment) {
          setCommentId(undefined)
          toast.error('Erro ao deletar comentário!')
        }
      }
    }

    refetchComments()
  }, [deleteComment, errorDeleteComment])

  return (
    <div
      className="w-full h-fit px-2 py-1 flex flex-row items-center justify-between group"
      data-preview={preview}
    >
      <div className="w-full h-full">
        <div className="flex flex-row gap-2 py-1 w-full items-center justify-center">
          <div className="w-11 h-10 group-data-[preview=true]:w-7 group-data-[preview=true]:h-6">
            <UserAvatar
              exibitionName={comment.user?.username || ''}
              userImage={comment.user?.profilePicture || ''}
            />
          </div>
          <Text className="text-xs text-start text-zinc-500 dark:text-zinc-300 group-data-[preview=false]:text-base">
            @{comment.user?.username}
          </Text>
        </div>
        <Text className="text-start text-xs pl-1 group-data-[preview=false]:text-sm group-data-[preview=false]:pl-2">
          {comment.content}
        </Text>
      </div>
      <ReactionCard for="comment" record={comment} token={token} />
      {!preview && userInfo?.id === comment.post.userId ? (
        <CommentCardOptions
          handleRemoveComment={() => setCommentId(comment.id)}
          comment={comment}
        />
      ) : null}
    </div>
  )
}

export { PostComments }
