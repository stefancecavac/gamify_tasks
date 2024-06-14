import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../redux/taskSlice";
import { RootState } from "../redux/store";


const useFetchTasks = () => {
    const tasks = useSelector((state:RootState) => state.tasks.tasks)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [error, seterror] = useState(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/tasks/', {
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
                    dispatch(setTasks(json))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchTasks()
    } , [dispatch])


    return { error, loading ,tasks}

}

export default useFetchTasks