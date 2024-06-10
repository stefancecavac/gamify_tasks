import { UseStateContext } from "./UseStateContext"


const UseDeleteTask = () => {
    const { dispatch } = UseStateContext()

    const deleteTask = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (response.ok) {
                dispatch({ type: 'DELETE_TASK', payload: id })

            }
        } catch (error) {
            console.log(error)
        }

    }

    return { deleteTask }
}

export default UseDeleteTask