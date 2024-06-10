import { loginData } from "../models/Types"
import { UseUserContext } from "./UseUserContext"


const UseLoginHook = () => {
    const {dispatch} = UseUserContext()

  
    const login = async(data:loginData ,setError) => {
        const response = await fetch(`http://localhost:3000/api/users/login`,{
            method: 'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type': 'application/json' },
            credentials:'include'
        })

        const json = await response.json()

        if(!response.ok){
            setError('email', { type: 'manual', message: json.message });
            setError('password', { type: 'manual', message: json.message });
        }

        if(response.ok){
            dispatch({type:'LOGIN' , payload:json})
            localStorage.setItem('user' , JSON.stringify(json))
        }
    }

    return {login}
}

export default UseLoginHook