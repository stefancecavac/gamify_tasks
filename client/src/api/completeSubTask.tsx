import { useState } from "react";

const useCompleteSubTask = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const completeSubTask = async (id: number | undefined ,completed:boolean) => {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/subTask/${id}`, {
                method: 'PATCH',
                body:JSON.stringify({completed}),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const json = await response.json();

            if (!response.ok) {
                setError(json)
                setLoading(false)
            }

            if (response.ok) {
                setError(null)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return { completeSubTask, error,loading  }
}

export default useCompleteSubTask