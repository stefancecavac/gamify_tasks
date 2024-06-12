import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTasks } from "../redux/taskSlice"
import { RootState } from "../redux/store"


const UseFetchTasks = () => {
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(false)
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchTastks = async() => {
            const response = await fetch('http://localhost:3000/api/tasks/',{
                credentials:'include'
            })
            const json = await response.json()

            if(response.ok){
                dispatch(setTasks(json))
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