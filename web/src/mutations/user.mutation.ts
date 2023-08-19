import { UserDTO } from '@/queries/user.query'
import { api } from '@/services/axios'
import { useMutation } from 'react-query'

interface UpdateUserProps {
  user: Partial<UserDTO> & { password?: string }
  token: string
}

const updateUser = async ({ user, token }: UpdateUserProps) => {
  const { data } = await api(token).patch(`/users/${user.id}`, {
    ...user,
    id: undefined,
  })

  const updatedUser: UserDTO = data.payload

  return updatedUser
}

const useUpdateUser = () => {
  return useMutation(
    ({ user, token }: UpdateUserProps) => updateUser({ user, token }),
    {
      // onSuccess: () => {
      //   queryClient.invalidateQueries(['posts'])
      // }
    },
  )
}

export { useUpdateUser }
