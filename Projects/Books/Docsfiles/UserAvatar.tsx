import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

const UserAvatar = ({name}:{name:string}) => {

    const userInitial = getInitials(name)
  return (
   <Avatar className=" h-8 w-8">
        <AvatarImage className="bg-brand-secondary" src="" />
        <AvatarFallback className="bg-brand-secondary text-sm">{userInitial}</AvatarFallback>
   </Avatar>
  )
}

export default UserAvatar