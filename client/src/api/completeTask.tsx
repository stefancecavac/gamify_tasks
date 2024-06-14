import { useState } from "react";
import { useDispatch} from "react-redux";
import { completeTask} from "../redux/taskSlice";

const useCompleteTask = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState(null)

        const complete = async (id:number) => {
          setLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/api/tasks/${id}/complete`, {
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
                    dispatch(completeTask(id))
                }
            } catch (error) {
                console.log(error)
            }
        }

    return {complete, error, loading}
}

export default useCompleteTask