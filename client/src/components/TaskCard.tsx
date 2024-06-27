import { taskData } from "../models/Types";
import { format} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import LoadingComponent from "./LoadingComponent";
import { useCompleteSubTask, useCompleteTask } from "../api/tasksApi";

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
    const { mutate: completeTask, isPending  } = useCompleteTask()
    const { mutate: completeSubTask } = useCompleteSubTask()


    const handleComplete = (id: number) => {
        completeTask(id);
    };

    const handleSubTask = async (id: number, completed: boolean) => {
        completeSubTask({ id, completed })
    };


    return (
        <>
            <AnimatePresence>
                <motion.div whileHover={{ scale: 1.1 }}
                    className={`rounded-md border-l-4 border-blue-300  flex shadow-md overflow-hidden bg-white`}>

                    <div className="p-2 flex-1 flex-col overflow-hidden">
                        <div className="flex justify-between items-center">
                            <p className="font-bold text-blue-300">{task?.title}</p>
                        </div>

                        <div className="mt-3">
                            {task.subTasks?.map((subTask) => (
                                <div key={subTask.id} className="flex items-center text-gray-500 gap-2">
                                    <input type="checkbox"
                                        onChange={() => handleSubTask(subTask.id!, !subTask.completed)}
                                        defaultChecked={subTask.completed}
                                        className="peer relative appearance-none  size-4 border  rounded-sm border-blue-300  cursor-pointer    checked:bg-blue-300"></input>
                                    <p>{subTask.title}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>

                            <p >{format(new Date(task.createdAt), 'MMMM do, hh:mm a')}</p>
                        </div>
                    </div>

                    <div className={`p-2 flex items-center`}>
                        {isPending ?
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
                                    className="size-7 text-blue-300 absolute hover:cursor-pointer"
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
                </motion.div>
            </AnimatePresence>

        </>
    );
};

export default TaskCard;
