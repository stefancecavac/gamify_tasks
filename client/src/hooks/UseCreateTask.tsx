import { taskData } from "../models/Types"
import { UseStateContext } from "./UseStateContext"


const UseCreateTask = () => {

    const { dispatch } = UseStateContext()

    const createTask = async (data: taskData , setNewTaskModal) => {
        const response = await fetch(`http://localhost:3000/api/tasks/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'ADD_TASK', payload: json })
            setNewTaskModal(false)
        }
    }
    return {createTask}
}

export default UseCreateTask