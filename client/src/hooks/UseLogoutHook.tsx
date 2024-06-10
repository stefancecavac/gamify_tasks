import { UseUserContext } from "./UseUserContext"



const UseLogoutHook = () => {
    const {dispatch} = UseUserContext()

    const handleLogout = async () => {
        const response = await fetch(`http://localhost:3000/api/users/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })

        if(response.ok){
            localStorage.removeItem('user')
            dispatch({type:'LOGOUT'})
        }
    }
    return{handleLogout}
}

export default UseLogoutHook