import { useState } from "react";
import { useDispatch} from "react-redux";
import { failTask} from "../redux/taskSlice";

const useDeleteTask = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState(null)
    const [deleteAnimation , setDeleteAnimation] = useState(false)

        const deleteTask = async (id:number) => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                  });
                const json = await response.json();

                if (!response.ok) {
                    seterror(json)
                    setLoading(false)
                }

                if (response.ok) {
                    seterror(null)
                    setLoading(false)
                    setDeleteAnimation(true)
                    setTimeout(() => {
                        dispatch(failTask(id))
                    } , 300)
                }
            } catch (error) {
                console.log(error)
            }
        }

    return {deleteTask, error, loading , deleteAnimation}
}

export default useDeleteTask