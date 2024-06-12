import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { login } from "../redux/authSlice"



const UseFetchUser = (id:number) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async (id: number) => {
            if(!id){
                return console.log('no id')
            }
            try {
                const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                    credentials: 'include'
                })
                const json = await response.json()

                if (response.ok) {
                    dispatch(login(json))
                }
            } catch (error) {
                console.log(error)
            }
            
            }
        fetchUser(id)
    },[id , dispatch])

}

export default UseFetchUser