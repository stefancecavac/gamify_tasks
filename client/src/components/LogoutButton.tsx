
import { UseAuthContext } from "../context/authContext"


const LogoutButton = () => {

    const {logout} = UseAuthContext()


    const handleLogout = () => {
        logout()
    }

    return (
        <button onClick={handleLogout} className=" rounded-2xl  font-bold text-neutral-700 p-2 transition-all hover:scale-110">Logout</button>
    )
}

export default LogoutButton