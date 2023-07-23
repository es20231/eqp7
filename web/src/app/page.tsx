'use client'

import { Waves } from '@/components/Waves'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="w-full h-screen bg-white">
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="text-5xl text-black">Página Inicial</h1>
        <h1 className="text-3xl mb-10 text-black">(em construção)</h1>
        <button
          onClick={() => router.push('/auth/login')}
          className="bg-cyan-green-500 h-14 px-4 rounded-md text-white"
        >
          Clique para fazer o login
        </button>
      </div>
      <Waves />
    </main>
  )
}
