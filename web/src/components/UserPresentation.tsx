import { Text } from './Text'
import { UserAvatar } from './UserAvatar'

interface UserPresentationProps {
  userImage: string
  username: string
  name: string
}

export const formatName = (fullName: string): string => {
  const names = fullName.split(' ')
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase() + names[0].slice(1)
  } else {
    const firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1)
    const lastName =
      names[names.length - 1].charAt(0).toUpperCase() +
      names[names.length - 1].slice(1)
    return `${firstName} ${lastName}`
  }
}

const UserPresentation = ({
  userImage,
  username,
  name,
}: UserPresentationProps) => {
  const exibitionName = formatName(name)

  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <div className="w-10 h-10">
        <UserAvatar userImage={userImage} exibitionName={exibitionName} />
      </div>
      <div className="flex flex-col items-center justify-center grow">
        <Text className="text-xs 2xl:text-sm text-start">{exibitionName}</Text>
        <Text className="italic text-xs text-start">{`@${username}`}</Text>
      </div>
    </div>
  )
}

export { UserPresentation }
