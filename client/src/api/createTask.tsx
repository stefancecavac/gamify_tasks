import { useState } from "react";
import { useDispatch} from "react-redux";
import { newTask} from "../redux/taskSlice";
import { taskData } from "../models/Types";


const useCreateTask = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState(null)

        const createTask = async (data:taskData) => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:3000/api/tasks/', {
                    method: 'POST',
                    body: JSON.stringify(data),
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
                    dispatch(newTask(json))
                }
            } catch (error) {
                console.log(error)
            }
        }



    return {createTask, error, loading}

}

export default useCreateTask