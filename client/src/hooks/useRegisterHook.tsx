import { useDispatch } from "react-redux"
import { registerData } from "../models/Types"
import { login } from "../redux/authSlice"



const UseRegisterHook = () => {
    const dispatch = useDispatch()


    const handleRegister = async (data: registerData , setError) => {
        const response = await fetch(`http://localhost:3000/api/users/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.field, { type: 'manual', message: json.message });
        }
        if (response.ok) {
            dispatch(login(json))
            localStorage.setItem('user', JSON.stringify(json))
        }
    }

    return {handleRegister}
}

export default UseRegisterHook