import { useEffect } from "react"
import { UseUserContext } from "./UseUserContext"



const UseFetchUser = (id:number) => {
    const { dispatch } = UseUserContext()

    useEffect(() => {
        const fetchUser = async (id: number) => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                    credentials: 'include'
                })
                const json = await response.json()

                if (response.ok) {
                    dispatch({ type: 'SET_USER', payload: json })
                }
            } catch (error) {
                console.log(error)
            }
            
            }
        fetchUser(id)
    },[id , dispatch])

}

export default UseFetchUser