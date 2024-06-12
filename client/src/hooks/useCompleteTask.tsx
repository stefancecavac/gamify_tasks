import { useDispatch} from "react-redux"

import { deleteTasks } from "../redux/taskSlice"
import { addXp } from "../redux/authSlice"




const UseCompleteTask = () => {
    const dispatch = useDispatch()

    const completeTask = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}/complete`, {
                method: 'DELETE',
                credentials: 'include'
            })
            const json = await response.json()

            if (response.ok) {
                    dispatch(deleteTasks(id))
                    dispatch(addXp(json))
                }     
        } catch (error) {
            console.log(error)
        }

    }
    return { completeTask }
}
export default UseCompleteTask