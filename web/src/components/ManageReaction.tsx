import { ReactionDTO } from '@/mutations/post-reaction.mutation'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Loader2, SmilePlus, Trash2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Button } from './Button'
import { Text } from './Text'
import { UserAvatar } from './UserAvatar'

interface ManageReactionProps {
  reactions: ReactionDTO[]
  hasNextPage: boolean | undefined
  fetchNextPage: () => void
  setReactionId: (id: string) => void
  isLoading: boolean
  isFetchingNextPage: boolean
}

const ManageReaction = ({
  reactions,
  setReactionId,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
}: ManageReactionProps) => {
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

  return (
    <div className="w-full h-full flex flex-col items-start justify-center">
      <ScrollArea.Root className="w-full h-[85%]">
        <ScrollArea.Viewport className="w-full h-full px-3">
          {reactions.length ? (
            <>
              {reactions.map((reaction) => (
                <div
                  key={reaction.id}
                  className="flex w-full h-full flex-row justify-around items-center"
                >
                  <div className="flex flex-row gap-2 py-1 w-full items-center justify-start">
                    <div className="w-10 h-10">
                      <UserAvatar
                        exibitionName={reaction.user?.username || ''}
                        userImage={reaction.user?.profilePicture || ''}
                      />
                    </div>
                    <Text className="text-base text-start text-zinc-500 dark:text-zinc-300 w-fit">
                      @{reaction.user.username}
                    </Text>
                  </div>
                  <Text className="text-start text-sm pl-2">
                    Reagiu com{' '}
                    <span
                      className="data-[like=true]:text-pacific-blue-500 font-bold text-red-400"
                      data-like={reaction.type === 'like'}
                    >
                      {reaction.type}
                    </span>
                  </Text>
                  <Button
                    className="w-[50%] bg-red-400 hover:bg-red-500"
                    rightIcon={<Trash2 size={16} strokeWidth={1.5} />}
                    onClick={() => setReactionId(reaction.id)}
                  >
                    Excluir
                  </Button>
                </div>
              ))}
              <div
                ref={loadMoreRef}
                className={
                  !hasNextPage
                    ? 'hidden h-5 w-fit'
                    : 'h-5 flex items-center justify-center w-full'
                }
              >
                {isFetchingNextPage ? (
                  <Loader2 className="animate-spin text-zinc-800 dark:text-slate-50" />
                ) : null}
              </div>

              {isLoading && <Text className="text-xs">Loading...</Text>}
              {!hasNextPage && !isLoading && (
                <Text className="text-center text-xs italic py-5">
                  Não há mais reações para carregar
                </Text>
              )}
            </>
          ) : (
            <div className="flex flex-col w-full h-full px-4 items-center justify-start gap-4">
              <SmilePlus
                className="text-zinc-600 dark:text-slate-50"
                size={28}
              />
              <Text className="text-xs">
                Esse comentário ainda não possui reações. <br />
                Seja o primeiro a reagir!
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

export { ManageReaction }
