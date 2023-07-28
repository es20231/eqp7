import { Text } from '@/components/Text'
import { Title } from '@/components/Title'
import Lottie from 'lottie-react'
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import errorPage from '../assets/error-page.json'
import { Button } from './Button'

interface ErrorProps {
  message?: string
}

const Error = ({ message }: ErrorProps) => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Lottie animationData={errorPage} loop autoplay />
      <Title className="text-center">Ocorreu um erro</Title>
      <Text>{message || ''}</Text>
      <div className="flex w-full flex-row items-center justify-center gap-2">
        <Button
          className="bg-pacific-blue-500 px-5 text-white hover:bg-pacific-blue-600"
          onClick={() => router.push('/')}
        >
          Voltar para o início
        </Button>
        <Button
          className="bg-pacific-blue-500 px-5 text-white hover:bg-pacific-blue-600"
          onClick={() => router.refresh()}
          rightIcon={<RefreshCw className="text-white" size={20} />}
        >
          Recarregar a página
        </Button>
      </div>
    </div>
  )
}

export { Error }
