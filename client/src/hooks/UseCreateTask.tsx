import { useDispatch } from "react-redux"
import { taskData } from "../models/Types"
import { createTasks } from "../redux/taskSlice"


const UseCreateTask = () => {

   const dispatch = useDispatch()

    const createTask = async (data: taskData , setNewTaskModal) => {
        const response = await fetch(`http://localhost:3000/api/tasks/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch(createTasks(json))
            setNewTaskModal(false)
        }
    }
    return {createTask}
}

export default UseCreateTask