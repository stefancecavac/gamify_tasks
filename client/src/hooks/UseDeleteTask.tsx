import { UseStateContext } from "./UseStateContext"
import { UseUserContext } from "./UseUserContext"


const UseDeleteTask = () => {
    const {tasks, dispatch } = UseStateContext()
    const {dispatch:userDispatch} = UseUserContext()

    const deleteTask = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (response.ok) {
                const deletedTask = tasks.find(task => task.id === id);
                if (deletedTask) {
                    const xpMap: { [key: string]: number } = {
                        'easy': 10,
                        'medium': 20,
                        'hard': 30
                    }
                 const xp = xpMap[deletedTask.difficulty] || 0
                 
                dispatch({ type: 'DELETE_TASK', payload: id })
                userDispatch({ type: 'REMOVE_XP' , payload:xp })
            }
        }
        } catch (error) {
            console.log(error)
        }

    }

    return { deleteTask }
}

export default UseDeleteTask