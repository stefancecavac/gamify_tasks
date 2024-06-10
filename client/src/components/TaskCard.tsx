import { Task } from "../models/Types"
import { formatDistanceToNow } from "date-fns"

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {

    return (
        <div className="rounded-xl flex flex-col shadow-md overflow-hidden bg-white transition-all   hover:scale-105">
            <div className="bg-green-400 p-2 flex justify-between">
                <p>{task.title}</p>
                <p className="text-white">{formatDistanceToNow(new Date(task.createdAt))} ago</p>

            </div>

            <div className="p-2">
                <p>{task.content}</p>
            </div>

            <div className="flex justify-between p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-400 hover:cursor-pointer p-1 hover:bg-green-200 rounded-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </div>

        </div>
    )
}

export default TaskCard