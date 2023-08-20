'use client'

import accountActivation from '@/assets/account-activation.json'
import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import { useActivateUser } from '@/queries/user.query'
import { useUserStore } from '@/stores/user.store'
import Lottie from 'lottie-react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ActivateTokenProps {
  params: {
    token: string
  }
}

const ActivateToken = ({ params }: ActivateTokenProps) => {
  const { token } = params
  const { userInfo, setUserInfo } = useUserStore((state) => state)
  const router = useRouter()

  const { isLoading, isError, error } = useActivateUser({
    activateToken: token,
    token: userInfo?.token || '',
  })

  useEffect(() => {
    if (userInfo && !isError) {
      setUserInfo({
        ...userInfo,
        emailVerified: true,
      })
      setTimeout(() => router.push('/dashboard'), 3000)
    }
  }, [isLoading, isError, router])

  if (isLoading)
    return (
      <div className="h-full px-4 w-full max-w-[70%] mx-auto overflow-hidden">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 px-16 py-8 rounded-2xl h-fit w-fit bg-gray-300 dark:bg-dark-slate-gray-400">
            <Title className="text-xl">Estamos ativando sua conta...</Title>
            <div className="flex flex-row items-center justify-center gap-3">
              <Loader2 className="animate-spin" />
            </div>
          </div>
        </div>
      </div>
    )

  if (isError && error)
    return (
      <div className="h-full px-4 w-full max-w-[70%] mx-auto overflow-hidden">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 px-16 py-8 rounded-2xl h-fit w-fit bg-gray-300 dark:bg-dark-slate-gray-400">
            <Title className="text-xl">
              Erro ao ativar sua conta, tente novamente mais tarde
            </Title>
          </div>
        </div>
      </div>
    )

  return (
    <div className="h-full px-4 w-full max-w-[70%] mx-auto overflow-hidden">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 px-16 py-8 rounded-2xl h-fit w-fit bg-gray-300 dark:bg-dark-slate-gray-400">
          <Lottie animationData={accountActivation} loop autoPlay />
          <Title className="text-xl">Sua conta foi ativada</Title>
          <div className="flex flex-row items-center justify-center gap-3">
            <Text>Redirecionando...</Text>
            <Loader2 className="animate-spin" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivateToken
