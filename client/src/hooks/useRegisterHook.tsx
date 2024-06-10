import { registerData } from "../models/Types"
import { UseUserContext } from "./UseUserContext"



const UseRegisterHook = () => {
    const { dispatch } = UseUserContext()


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
            dispatch({ type: 'LOGIN', payload: json })
            localStorage.setItem('user', JSON.stringify(json))
        }
    }

    return {handleRegister}
}

export default UseRegisterHook