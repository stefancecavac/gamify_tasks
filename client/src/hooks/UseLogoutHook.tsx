import { useDispatch } from "react-redux"
import { logout } from "../redux/authSlice"
import { useNavigate } from "react-router-dom"



const UseLogoutHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        const response = await fetch(`http://localhost:3000/api/users/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if(response.ok){
            navigate('/signup' , {replace:true})
            dispatch(logout())
            localStorage.removeItem('user')
        }
    }
    return{handleLogout}
}

export default UseLogoutHook