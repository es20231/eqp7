'use client'

import { filterValues } from '@/assets/filter-class-values'
import { useUpdateImage } from '@/mutations/image.mutation'
import { UserImagesDTO } from '@/queries/user.query'
import { queryClient } from '@/services/queryClient'
import { useUserStore } from '@/stores/user.store'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import * as Popover from '@radix-ui/react-popover'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Select from '@radix-ui/react-select'
import {
  Check,
  ChevronDown,
  MoreHorizontal,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import Image from 'next/image'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from 'react'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'
import { Text } from './Text'
import { Title } from './Title'

interface ImageCardOptionsProps {
  handleDeleteImage: () => void
  image: UserImagesDTO
}

const ImageCardOptions = ({
  handleDeleteImage,
  image,
}: ImageCardOptionsProps) => {
  const [chooseImageFilterModalOpen, setChooseImageFilterModalOpen] =
    useState(false)
  const [removeImageDialogOpen, setRemoveImageDialogOpen] = useState(false)

  const { userInfo } = useUserStore((state) => state)

  const { mutate } = useUpdateImage()

  const [selectedFilter, setSelectedFilter] = useState(image.filter)

  const handleApplyFilter = () => {
    mutate(
      {
        image: {
          id: image.id,
          filter: selectedFilter || '',
        },
        token: userInfo?.token || '',
      },
      {
        onSuccess: () => {
          setChooseImageFilterModalOpen(false)
          toast.success('Filtro aplicado com sucesso!')
          queryClient.invalidateQueries([
            'images',
            { token: userInfo?.token, userId: userInfo?.id },
          ])
        },
        onError: (err: any) => {
          toast.error(err.response.data.message || 'Erro ao aplicar filtro')
          console.log('ErrorApplyingFilter', err)
        },
      },
    )
  }

  return (
    <Dialog.Root open={chooseImageFilterModalOpen}>
      <AlertDialog.Root open={removeImageDialogOpen}>
        <Popover.Root>
          <Popover.Trigger className="text-zinc-600 rounded-md dark:text-slate-50 w-fit flex items-center h-full bg-transparent cursor-pointer p-1 dark:hover:bg-pacific-blue-600 hover:bg-pacific-blue-600 border-2 border-pacific-blue-600 transition-colors">
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
                  onClick={() => setChooseImageFilterModalOpen(true)}
                  rightIcon={
                    <Sparkles
                      className="text-slate-50"
                      size={20}
                      strokeWidth={1.7}
                    />
                  }
                >
                  Aplicar filtro
                </Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed h-full top-[50%] left-[50%] max-h-[75vh] w-full max-w-[70vw] translate-x-[-50%] translate-y-[-50%] bg-slate-100 dark:bg-rich-black-500 rounded-xl overflow-hidden data-[state=open]:animate-contentShow">
                  <Dialog.Title className="text-xl font-bold w-full pt-8 px-8">
                    <Title className="text-left">Aplicar filtro</Title>
                  </Dialog.Title>
                  <Dialog.Description className="px-8 w-full">
                    <Text className="text-left">
                      Escolha um filtro para sua imagem.
                    </Text>
                  </Dialog.Description>
                  <div className="flex flex-col items-center justify-center p-8 w-full max-h-full h-[60vh] gap-8">
                    <div className="flex items-center justify-evenly w-full h-full gap-8">
                      <div className="overflow-hidden rounded-lg shadow-lg w-80 h-80">
                        <figure
                          className={`filter-${selectedFilter} transition-all h-full w-full`}
                        >
                          <Image
                            alt="user image"
                            key={image.id}
                            src={image.url}
                            width={320}
                            height={320}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        </figure>
                      </div>
                      <div className="flex flex-col gap-2 items-center justify-center h-full">
                        <Title className="text-xl text-start">
                          Escolha um filtro
                        </Title>
                        <Select.Root
                          onValueChange={(value) => {
                            setSelectedFilter(value)
                          }}
                          defaultValue={image.filter}
                        >
                          <Select.Trigger className="flex items-center min-w-[20rem] justify-between gap-4 px-4 py-2 dark:bg-dark-slate-gray-500 bg-gray-200 text-zinc-800 dark:text-slate-50 rounded-md">
                            <Select.Value placeholder="Selecione um filtro" />
                            <Select.Icon>
                              <ChevronDown className="text-zinc-800 dark:text-slate-50" />
                            </Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content
                              sideOffset={2}
                              className="bg-dark-slate-gray-400 w-full rounded-md"
                            >
                              <ScrollArea.Root className="w-full h-full">
                                <ScrollArea.Viewport className="w-full h-full">
                                  <Select.Viewport className="p-2 h-full">
                                    <Select.Group className="flex flex-col gap-1">
                                      <Select.Label className="px-6 text-xs leading-6">
                                        Filtros disponíveis
                                      </Select.Label>
                                      <SelectItem value="">Nenhum</SelectItem>
                                      {Object.keys(filterValues).map(
                                        (filter) => (
                                          <SelectItem
                                            key={filter}
                                            value={filterValues[filter]}
                                          >
                                            {filter}
                                          </SelectItem>
                                        ),
                                      )}
                                    </Select.Group>
                                  </Select.Viewport>
                                </ScrollArea.Viewport>
                                <ScrollArea.Scrollbar
                                  className="flex select-none touch-none p-0.5 bg-slate-100 dark:bg-zinc-800 transition-colors duration-[160ms] ease-out hover:bg-slate-200 dark:hover:bg-zinc-950 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                                  orientation="vertical"
                                >
                                  <ScrollArea.Thumb className="flex-1 dark:bg-slate-100 bg-zinc-700/80 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                                </ScrollArea.Scrollbar>
                              </ScrollArea.Root>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
                        <Button
                          className="w-fit self-end"
                          onClick={handleApplyFilter}
                        >
                          Aplicar filtro
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Dialog.Close
                    className="absolute top-8 right-8 p-2"
                    onClick={() => {
                      setChooseImageFilterModalOpen(false)
                    }}
                  >
                    <X />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
              <AlertDialog.Trigger
                asChild
                className="bg-red-400 h-full w-full rounded-md"
                onClick={() => setRemoveImageDialogOpen(true)}
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
                    <Title className="text-left">Excluir image</Title>
                  </AlertDialog.Title>
                  <AlertDialog.Description asChild className="px-8 w-full">
                    <Text className="text-left pt-2">
                      Essa ação não poderá ser desfeita. Tem certeza que deseja
                      excluir essa imagem?
                    </Text>
                  </AlertDialog.Description>
                  <div className="flex justify-end gap-4 px-8">
                    <AlertDialog.Cancel
                      className="p-2"
                      asChild
                      onClick={() => {
                        setRemoveImageDialogOpen(false)
                      }}
                    >
                      <Button className="w-[20%]">Cancelar</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action
                      asChild
                      onClick={() => {
                        handleDeleteImage()
                        setRemoveImageDialogOpen(false)
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

const SelectItem = forwardRef<
  ElementRef<typeof Select.Item>,
  ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={twMerge(
        'text-base leading-none text-zinc-800 py-4 dark:text-slate-50 rounded-md flex items-center h-6 pr-9 pl-6 relative select-none data-[disabled]:text-gray-300 dark:data-[disabled]:text-gray-300 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-dark-slate-gray-500',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
        <Check className="text-zinc-800 dark:text-slate-50" size={20} />
      </Select.ItemIndicator>
    </Select.Item>
  )
})
SelectItem.displayName = Select.Item.displayName

export { ImageCardOptions }
