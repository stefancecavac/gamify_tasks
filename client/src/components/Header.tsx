import { UseUserContext } from "../hooks/UseUserContext"
import LogoutButton from "./LogoutButton"


const Header = () => {
    const { user } = UseUserContext()

    return (
        <div className="flex justify-between items-center p-5 shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <h1 className="text-4xl font-bold text-white">TaskQuest</h1>
            <div className="flex items-center gap-5">
                <p className="text-white text-xl">{user?.user_name}</p>
                <LogoutButton></LogoutButton>
            </div>


        </div>
    )
}

export default Header 