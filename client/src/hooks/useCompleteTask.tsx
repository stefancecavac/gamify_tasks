import { UseStateContext } from "./UseStateContext"
import { UseUserContext } from "./UseUserContext"




const UseCompleteTask = () => {
    const { tasks, dispatch } = UseStateContext()
    const { dispatch:userDispatch} = UseUserContext()

    const completeTask = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}/complete`, {
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
                    userDispatch({type: 'ADD_XP' , payload: xp})
                }
            }
        } catch (error) {
            console.log(error)
        }

    }
    return { completeTask }
}
export default UseCompleteTask