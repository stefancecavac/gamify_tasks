import { useDispatch, useSelector } from "react-redux"
import { deleteTasks } from "../redux/taskSlice"
import { RootState } from "../redux/store"


const UseDeleteTask = () => {
    const tasks = useSelector((state:RootState) => state.tasks.tasks)
    const dispatch = useDispatch()
    

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
                 
                 dispatch(deleteTasks(id))
                    
            }
        }
        } catch (error) {
            console.log(error)
        }

    }

    return { deleteTask }
}

export default UseDeleteTask