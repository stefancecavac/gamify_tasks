import { useEffect, useState } from "react"
import { UseStateContext } from "./UseStateContext"


const UseFetchTasks = () => {
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(false)
    const {tasks, dispatch} = UseStateContext()

    
    useEffect(() => {
        const fetchTastks = async() => {
            const response = await fetch('http://localhost:3000/api/tasks/',{
                credentials:'include'
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type:'SET_TASKS' , payload:json})
                setError(false)
                setLoading(false)
            }
            if(!response.ok){
                setError(json.message)
                setLoading(false)
            }
        }
        fetchTastks()
    }, [dispatch ])
    
    return {tasks,loading ,error}
}

export default UseFetchTasks