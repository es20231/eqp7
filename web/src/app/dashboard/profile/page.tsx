'use client'

import { Button } from '@/components/Button'
import {
  UpdateUserFormComponent,
  UpdateUserFormProvider,
} from '@/components/Form/Providers/UpdateUserForm'
import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import { UserAvatar } from '@/components/UserAvatar'
import { formatName } from '@/components/UserPresentation'
import { useUserStore } from '@/stores/user.store'
import * as Dialog from '@radix-ui/react-dialog'
import { UserCog, X } from 'lucide-react'
import { useState } from 'react'

const Profile = () => {
  const { userInfo } = useUserStore((state) => state)
  const [isOpen, setIsOpen] = useState(false)

  if (!userInfo) return null

  return (
    <div className="h-full px-4 w-full max-w-[70%] flex flex-col gap-8 relative">
      <div className="w-full grid grid-cols-[25%_1fr] gap-4 items-center justify-center mt-8">
        <div className="h-56 w-56 mx-auto">
          <UserAvatar
            userImage={userInfo.profilePicture || ''}
            exibitionName={formatName(userInfo.fullName)}
            width={120}
            height={120}
          />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="w-full flex justify-between items-center">
            <div>
              <Text className="font-bold text-start">{userInfo.fullName}</Text>
              <Text className="text-gray-500 dark:text-gray-300 text-start mb-4">
                @{userInfo.username}
              </Text>
            </div>
            <Dialog.Root open={isOpen}>
              <Dialog.Trigger asChild>
                <Button
                  rightIcon={<UserCog className="text-slate-50  " size={24} />}
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
                  <div className="flex flex-col items-center justify-start p-8 w-full max-h-full h-[60vh] gap-8">
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
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in lectus sit amet metus congue ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas ultricies ligula ac libero vehicula, in tempor felis pellentesque. Sed tristique lobortis condimentum. Sed ac sagittis ipsum. Curabitur convallis lobortis felis, eu fermentum ipsum. Sed gravida, ipsum eget pharetra dignissim, arcu est condimentum arcu, non aliquam odio ligula sed turpis. Vivamus lacinia, odio eget bibendum scelerisque, nisi odio auctor dui, eget gravida lectus elit sed velit.'}
          </Text>
        </div>
      </div>
      <div className="px-4">
        <Title className="text-start">Posts</Title>
      </div>
    </div>
  )
}

export default Profile
