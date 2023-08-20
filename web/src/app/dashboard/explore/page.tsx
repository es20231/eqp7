'use client'

import { Error } from '@/components/Error'
import { ListUsers } from '@/components/ListUsers'
import { Title } from '@/components/Title'
import { useUserStore } from '@/stores/user.store'
import { Search } from 'lucide-react'
import { useState } from 'react'

const Explore = () => {
  const { userInfo } = useUserStore((state) => state)
  const [draft, setDraft] = useState('')
  const [search, setSearch] = useState('')

  if (!userInfo) {
    return (
      <Error message="Ocorreu um erro ao carregar as informações do usuário" />
    )
  }

  const handleSearch = () => setSearch(draft)

  return (
    <div className="h-full px-4 w-full max-w-[70%]">
      <div className="flex flex-row items-center justify-between px-4 py-2 w-full">
        <Title className="w-fit">Usuários para explorar</Title>
        <div className="flex flex-row items-center flex-1 justify-center max-w-xl ml-4 px-4 gap-2 rounded-md py-1 shadow-sm bg-gray-300 dark:bg-dark-slate-gray-400">
          <input
            id="search"
            autoComplete="off"
            value={draft}
            className="flex-1 py-1 2xl:py-2 bg-gray-300 dark:bg-dark-slate-gray-400 rounded-md text-sm 2xl:text-lg text-zinc-800 dark:text-slate-50  focus:outline-none"
            placeholder="Pesquise por usuário, nome ou email"
            onChange={(e) => setDraft(e.target.value)}
          />
          <div onClick={handleSearch} className="cursor-pointer">
            <Search />
          </div>
        </div>
      </div>
      <ListUsers
        token={userInfo.token}
        userId={userInfo.id}
        search={search}
        draft={draft}
      />
    </div>
  )
}

export default Explore
