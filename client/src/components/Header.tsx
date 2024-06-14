import { useSelector } from "react-redux"
import LogoutButton from "./LogoutButton"
import { RootState } from "../redux/store"


const Header = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    

    return (

        <div className="flex justify-between items-center p-5 shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <h1 className="text-2xl font-bold text-white">TaskQuest</h1>
            <div className="flex items-center gap-5">
                <p className="text-white text-xl">{user?.user_name}</p>
                <p className="text-white">{user?.experience_points} Xp</p>
                <LogoutButton />
            </div>


        </div>
    )
}

export default Header 