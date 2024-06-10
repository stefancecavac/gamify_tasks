import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskData, taskSchema } from "../models/Types";
import UseCreateTask from "../hooks/UseCreateTask";


interface TaskModalProps {
    newTaskModal: boolean;
    setNewTaskModal: (value: boolean) => void;

}

const NewTaskModal: React.FC<TaskModalProps> = ({ newTaskModal, setNewTaskModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<taskData>({ resolver: zodResolver(taskSchema) })
    const { createTask } = UseCreateTask()

    const handleCreate = (data: taskData) => {
        createTask(data, setNewTaskModal)
    }


    return (
        <div className={` top-0 left-0 w-full h-full flex  items-center justify-center bg-black bg-opacity-50 ${newTaskModal ? "fixed animate-modal-opacity" : "hidden"}`}>
            <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col overflow-hidden items-center absolute bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl w-2/6 animate-modal">
                <button onClick={() => setNewTaskModal(false)} className="absolute top-0 right-0 m-2">Close</button>
                <p className="mb-10 flex m-5 font-bold flex-col text-3xl text-white ">New Task</p>

                <label className="flex w-full px-10 font-bold flex-col text-white ">Task name:
                    <input className="mt-1 p-2 rounded-2xl text-gray-500 bg-gray-200" {...register('title')}></input>
                    {errors.title?.message && <span className="text-red-500 font-normal">{errors.title.message}</span>}
                </label>
                
                <label className="flex w-full px-10 mt-5 font-bold flex-col text-white ">Select Difficulty:
                    <select className="mt-1 p-2 rounded-2xl text-gray-500 bg-gray-200" {...register('difficulty')}>
                        <option disabled value="">Select Difficulty</option>
                        {taskSchema.shape.difficulty._def.values.map(difficulty => (
                            <option key={difficulty} value={difficulty}>{difficulty}</option>
                        ))}
                    </select>
                </label>
                <div className="bg-white  w-full mt-10 px-10">
                    <label className="flex pt-5 w-full font-bold flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">Task content:
                        <textarea className="mt-1 resize-none h-32 p-2 rounded-2xl text-gray-500 bg-gray-200" {...register('content')}></textarea>
                        {errors.content?.message && <span className="text-red-500 font-normal">{errors.content.message}</span>}
                    </label>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-2 text-xl text-white mt-5 m-5 transition-colors hover:bg-gradient-to-l ">Create Task</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewTaskModal