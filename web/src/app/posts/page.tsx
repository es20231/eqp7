'use client'

import { Navbar } from '@/components/Navbar'

export default function Posts() {
  return (
    <div className="w-full h-full bg-gray-200 flex flex-col">
      <Navbar currentPage={'Posts'} />
      <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3 my-20">
        {/* Fazer um map de uma lista de posts para criar o PostCard */}
      </div>
    </div>
  )
}
