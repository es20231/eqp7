'use client'

import { Button } from '@/components/Button'
import {
  ChangePasswordFormComponent,
  ChangePasswordFormProvider,
} from '@/components/Form/Providers/ChangePasswordForm'
import {
  UpdateUserFormComponent,
  UpdateUserFormProvider,
} from '@/components/Form/Providers/UpdateUserForm'
import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import { UserAvatar } from '@/components/UserAvatar'
import { UserPosts } from '@/components/UserPosts'
import { formatName } from '@/components/UserPresentation'
import { useUserStore } from '@/stores/user.store'
import * as Dialog from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Tabs from '@radix-ui/react-tabs'
import { UserCog, X } from 'lucide-react'
import { useState } from 'react'

const Profile = () => {
  const { userInfo } = useUserStore((state) => state)
  const [isOpen, setIsOpen] = useState(false)

  if (!userInfo) return null

  return (
    <div className="h-full px-4 w-full max-w-[70%] flex flex-col gap-8 relative">
      <ScrollArea.Root className="w-full h-[95%]">
        <ScrollArea.Viewport className="w-full h-full px-3">
          <div className="w-full flex flex-row gap-4 items-center justify-start mt-8 px-4">
            <div className="h-56 w-56 mx-auto">
              <UserAvatar
                userImage={userInfo.profilePicture || ''}
                exibitionName={formatName(userInfo.fullName)}
                width={120}
                height={120}
              />
            </div>
            <div className="flex flex-col flex-1 gap-1 items-center justify-center">
              <div className="w-full flex justify-between items-center">
                <div>
                  <Text className="font-bold text-start">
                    {userInfo.fullName}
                  </Text>
                  <Text className="text-gray-500 dark:text-gray-300 text-start mb-4">
                    @{userInfo.username}
                  </Text>
                </div>
                <Dialog.Root open={isOpen}>
                  <Dialog.Trigger asChild>
                    <Button
                      rightIcon={
                        <UserCog className="text-slate-50  " size={24} />
                      }
                      className="w-fit gap-4"
                      onClick={() => setIsOpen(true)}
                    >
                      Editar perfil
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed h-full top-[50%] left-[50%] max-h-[75vh] w-full max-w-[70vw] translate-x-[-50%] translate-y-[-50%] bg-slate-100 dark:bg-rich-black-500 rounded-xl overflow-hidden data-[state=open]:animate-contentShow">
                      <Dialog.Title className="text-xl font-bold w-full pt-8 px-8">
                        <Title className="text-left">Editar perfil</Title>
                      </Dialog.Title>
                      <Dialog.Description className="px-8 w-full">
                        <Text className="text-left">
                          Faça as alterações que desejar e clique em salvar.
                        </Text>
                      </Dialog.Description>
                      <Tabs.Root
                        className="flex flex-col w-[85%] mx-auto h-full py-4 shadow-sm dark:shadow-dark-slate-gray-400/50 shadow-slate-300"
                        defaultValue="edit"
                      >
                        <Tabs.List className="shrink-0 flex border-b border-dark-slate-gray-400/50">
                          <Tabs.Trigger
                            className="bg-transparent px-5 h-10 flex-1 flex items-center justify-center leading-none select-none first:rounded-tl-md last:rounded-tr-md outline-none cursor-default data-[state=active]:border-b-2 data-[state=active]:border-pacific-blue-500"
                            value="account"
                          >
                            <Text>Gerenciar informações</Text>
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className="bg-transparent px-5 h-10 flex-1 flex items-center justify-center leading-none select-none first:rounded-tl-md last:rounded-tr-md outline-none cursor-default data-[state=active]:border-b-2 data-[state=active]:border-pacific-blue-500"
                            value="password"
                          >
                            <Text>Mudar senha</Text>
                          </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content
                          className="flex-1 flex flex-col"
                          value="account"
                          asChild
                        >
                          <div className="flex flex-col items-start justify-start p-8 w-full gap-8">
                            <UpdateUserFormProvider
                              user={{
                                biography: userInfo.biography || '',
                                fullName: userInfo.fullName,
                                profilePicture: userInfo.profilePicture || '',
                                username: userInfo.username,
                                email: userInfo.email,
                                emailVerified: userInfo.emailVerified,
                                id: userInfo.id,
                              }}
                            >
                              <UpdateUserFormComponent
                                token={userInfo.token}
                                user={{
                                  biography: userInfo.biography || '',
                                  fullName: userInfo.fullName,
                                  profilePicture: userInfo.profilePicture || '',
                                  username: userInfo.username,
                                  email: userInfo.email,
                                  emailVerified: userInfo.emailVerified,
                                  id: userInfo.id,
                                }}
                                setIsOpen={setIsOpen}
                              />
                            </UpdateUserFormProvider>
                          </div>
                        </Tabs.Content>
                        <Tabs.Content
                          className="flex-1 flex flex-col"
                          value="password"
                          asChild
                        >
                          <ChangePasswordFormProvider>
                            <ChangePasswordFormComponent />
                          </ChangePasswordFormProvider>
                        </Tabs.Content>
                      </Tabs.Root>
                      <Dialog.Close
                        className="absolute top-8 right-8 p-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <X />
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>
              <Text className="text-start">Biografia:</Text>
              <Text className="text-justify max-w-5xl text-gray-500 dark:text-zinc-300">
                {userInfo.biography ||
                  'Este usuário ainda não possui biografia'}
              </Text>
            </div>
          </div>
          <div className="px-4">
            <Title className="text-start">Posts</Title>
            <UserPosts token={userInfo.token} userId={userInfo.id} />
          </div>
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

export default Profile
