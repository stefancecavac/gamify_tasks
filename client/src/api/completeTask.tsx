import { useState } from "react";
import { useDispatch } from "react-redux";
import { completeTask } from "../redux/taskSlice";
import { addCurrency} from "../redux/authSlice";

const useCompleteTask = () => {

    

    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const complete = async (id: number) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}/complete`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json.message)
                setLoading(false)
            }

            if (response.ok) {
                setError(null)
                setLoading(false)
                dispatch(addCurrency(json))
                dispatch(completeTask(id))
              
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { complete, error,loading  }
}

export default useCompleteTask