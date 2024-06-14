import { useDispatch } from "react-redux"
import { logoutUser } from "../redux/authSlice"
import { AppDispatch } from "../redux/store"


const LogoutButton = () => {
    const dispatch = useDispatch<AppDispatch>()

    return(
        <button onClick={() => dispatch(logoutUser())} className="border-2 rounded-2xl  font-bold text-white p-2 transition-all hover:scale-110">Logout</button>
    )
}

export default LogoutButton