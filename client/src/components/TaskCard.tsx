
import { taskData } from "../models/Types"
import { formatDistanceToNow } from "date-fns"
import useDeleteTask from "../api/deleteTask";
import useCompleteTask from "../api/completeTask";
import LoadingComponent from "./LoadingComponent";


const difficultyColors = {
    easy: 'text-green-500',
    medium: 'text-yellow-500',
    hard: 'text-red-500',
};

const TaskCard: React.FC<{ task: taskData }> = ({ task }) => {
    const { deleteTask, loading: deleteLoading, deleteAnimation } = useDeleteTask()
    const { complete, loading: completeLoading } = useCompleteTask()



    const handleDelete = async (id: number) => {
        deleteTask(id);

    }

    const handleComplete = async (id: number) => {
      complete((id))
      
    }


    return (
        <div className={`rounded-xl transition-all  ease-in-out flex  shadow-md overflow-hidden bg-white ${deleteAnimation ? 'animate-delete ' : 'animate-task  '} `}>

            <div onClick={() => handleComplete(task.id!)} className={`hover:bg-green-400 transition-all p-2 flex  items-center hover:cursor-pointer`}>
                {completeLoading ?
                    <LoadingComponent></LoadingComponent>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-gray-300 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>}
            </div>


            <div className="p-2 flex-1 flex-col overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                    <p className="   font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">{task.title}</p>
                    <p className={`text-xs ${difficultyColors[task.difficulty]} `}>{task.difficulty}</p>
                </div>
                <p className="text-gray-500 text-xs  break-words">{task.content}</p>
                <p className="text-xs text-gray-500 text-center mt-5">{formatDistanceToNow(new Date(task.createdAt))} ago</p>

            </div>

            <div onClick={() => handleDelete(task.id!)} className="flex p-2 hover:bg-red-500 transition-all items-center hover:cursor-pointer ">
                {deleteLoading ?
                    <LoadingComponent></LoadingComponent>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6  text-gray-300">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>}

            </div>

        </div>
    )
}

export default TaskCard