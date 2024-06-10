import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskData, taskSchema } from "../models/Types";
import { UseStateContext } from "../hooks/UseStateContext";


interface TaskModalProps {
    newTaskModal: boolean;
    setNewTaskModal: (value: boolean) => void;

}

const NewTaskModal: React.FC<TaskModalProps> = ({ newTaskModal, setNewTaskModal }) => {
    const { register, handleSubmit } = useForm<taskData>({ resolver: zodResolver(taskSchema) })
    const {dispatch} = UseStateContext()

    const createTask = async(data:taskData) => {
        const response = await fetch(`http://localhost:3000/api/tasks/`,{
            method: 'POST',
            body:JSON.stringify(data),
            headers:{'Content-Type': 'application/json' },
            credentials:'include'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'ADD_TASK' , payload: json})
            setNewTaskModal(false)
        }
    }


    return (
        <div className={` top-0 left-0 w-full h-full flex  items-center justify-center bg-black bg-opacity-50 ${newTaskModal ? "fixed animate-modal-opacity" : "hidden"}`}>
            <div className="absolute bg-white rounded-2xl w-2/5 animate-modal">
                <button onClick={() => setNewTaskModal(false)} className="absolute top-0 right-0 m-2">Close</button>
                <form onSubmit={handleSubmit(createTask)} className="p-4 flex flex-col items-center">
                    <p className="mb-10 flex w-3/5 font-bold flex-col text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">New Task</p>

                    <label className="flex w-3/5 font-bold flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">Task name:
                        <input className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" {...register('title')}></input>
                    </label>

                    <label className="flex w-full font-bold flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">Task name:
                        <textarea className="mt-2 resize-none p-2 rounded-2xl text-gray-500 bg-gray-200" {...register('content')}></textarea>
                    </label>

                    <button type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-2 text-xl text-white mt-5 transition-colors hover:bg-gradient-to-l ">Create Task</button>
                </form>
            </div>
        </div>
    )
}

export default NewTaskModal