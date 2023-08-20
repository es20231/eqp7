'use client'

import { Button } from '@/components/Button'
import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import { api } from '@/services/axios'
import { useUserStore } from '@/stores/user.store'
import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import verifyMail from '../../../assets/verify-mail.json'

const ActivateAccount = () => {
  const { userInfo } = useUserStore((state) => state)
  const router = useRouter()

  const handleResendEmail = async () => {
    await api(userInfo?.token)
      .get(`/auth/token/${userInfo?.id}`)
      .then(
        (res) =>
          res.status === 200 &&
          toast.success(
            'Email enviado com sucesso, verifique sua caixa de entrada.',
          ),
      )
      .catch((err) => {
        console.log('ErrorResendEmail: ', err)
        toast.error('Erro ao enviar email, tente novamente mais tarde.')
      })
  }

  return (
    <div className="h-full px-4 w-full max-w-[70%] mx-auto overflow-hidden">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 px-16 py-8 rounded-2xl h-fit w-fit bg-gray-300 dark:bg-dark-slate-gray-400">
          <div className="w-64 h-64 overflow-hidden">
            <Lottie animationData={verifyMail} loop autoplay />
          </div>
          <Title className="text-lg leading-4">
            Verifique o seu email, mandamos um link <br /> para ativar sua
            conta.
          </Title>
          <div>
            <Text className="text-sm text-orange-300">
              Não esqueça de verificar a caixa de span
            </Text>
            <Text className="text-xs items-center justify-center flex gap-2">
              Não está achando?
              <span
                className="group transition duration-300 cursor-pointer"
                onClick={handleResendEmail}
              >
                Mandar novamente
                <span className="block max-w-0 group-hover:max-w-full trasition-all duration-500 h-0.5 bg-pacific-blue-500" />
              </span>
            </Text>
          </div>
          <Button className="w-fit" onClick={() => router.push('/dashboard')}>
            Ir para o dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActivateAccount
