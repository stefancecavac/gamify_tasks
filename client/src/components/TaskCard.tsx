import { taskData } from "../models/Types";
import { formatDistanceToNow } from "date-fns";
import useCompleteTask from "../api/completeTask";
import { AnimatePresence, motion } from "framer-motion";
import LoadingComponent from "./LoadingComponent";
import useCompleteSubTask from "../api/completeSubTask";



const outlineVariants = {
    default: {
        strokeWidth: 0,
        pathLength: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    hover: {
        strokeWidth: 2,
        pathLength: 1,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

const TaskCard: React.FC<{ task: taskData }> = ({ task }) => {
    const { complete, loading: completeLoading, error } = useCompleteTask()
    const { completeSubTask } = useCompleteSubTask()
    
 

    const handleComplete = async (id: number) => {
        await complete(id);
    };

    const handleSubTask = async (id: number | undefined, completed: boolean) => {
        completeSubTask(id, completed)
    };


    return (
        <>
            <AnimatePresence>
                <motion.div whileHover={{ scale: 1.1 }}
                    className={`rounded-xl  flex shadow-md overflow-hidden bg-white`}>
                    <div className={` bg-blue-300  p-2 flex items-center`}>
                        {completeLoading ?
                            <LoadingComponent></LoadingComponent>
                            :
                            <>
                                <input type="checkbox" className="size-7 appearance-none rounded-lg bg-gray-100 hover:cursor-pointer relative"></input>
                                <motion.svg
                                    onClick={() => handleComplete(task.id!)}
                                    whileHover='hover'
                                    initial='default'
                                    animate='default'
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-7 text-neutral-400 absolute hover:cursor-pointer"
                                >
                                    <motion.path
                                        variants={outlineVariants}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                    />
                                </motion.svg>
                            </>
                        }
                    </div>

                    <div className="p-2 flex-1 flex-col overflow-hidden">
                        <div className="flex justify-between items-center mb-3">
                            <p className="font-bold text-primary">{task.title}</p>
                        </div>

                        {task.subTasks?.map((subTask) => (
                            <div key={subTask.id} className="flex items-center gap-2">
                                <input type="checkbox"
                                    onChange={() => handleSubTask(subTask.id, !subTask.completed)}
                                    defaultChecked={subTask.completed}
                                    className="peer relative appearance-none  size-5 border rounded-xl border-blue-300  cursor-pointer    checked:bg-blue-300"></input>
                                <p>{subTask.title}</p>
                                {subTask.completed && <p>+1</p>}
                            </div>
                        ))}
                        {error && <div>{error}</div>}
                        <p className="text-xs text-text-primary text-center mt-5">{formatDistanceToNow(new Date(task.createdAt))} ago</p>
                    </div>

                </motion.div>
            </AnimatePresence>

        </>
    );
};

export default TaskCard;
