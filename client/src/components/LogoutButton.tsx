import UseLogoutHook from "../hooks/UseLogoutHook"


const LogoutButton = () => {
    const {handleLogout} = UseLogoutHook()

    return(
        <button onClick={() => handleLogout()} className="border-2 rounded-2xl  font-bold text-white p-2 transition-all hover:scale-110">Logout</button>
    )
}

export default LogoutButton