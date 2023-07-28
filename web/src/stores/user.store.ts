import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserProps = {
  id: string
  fullName: string
  username: string
  email: string
  emailVerified: boolean
  profilePicture?: string
  biography?: string
}

export type UserInfo = ({ token: string } & UserProps) | undefined

type UserStore = {
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userInfo: undefined,
      setUserInfo: (userInfo) =>
        set((prevState) => ({ ...prevState, userInfo })),
    }),
    { name: 'user-storage' },
  ),
)

export { useUserStore }
