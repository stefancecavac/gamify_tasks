import { taskData } from "../models/Types";
import { formatDistanceToNow } from "date-fns";
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
    const {mutate:completeTask , isPending} = useCompleteTask()
    const { mutate:completeSubTask} = useCompleteSubTask()


    const handleComplete = (id: number) => {
        completeTask(id);
    };

    const handleSubTask = async (id: number , completed: boolean) => {
        completeSubTask({id, completed})
    };


    return (
        <>
            <AnimatePresence>
                <motion.div whileHover={{ scale: 1.1 }}
                    className={`rounded-xl  flex shadow-md overflow-hidden bg-white`}>
                    <div className={` bg-blue-300  p-2 flex items-center`}>
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
                                    onChange={() => handleSubTask(subTask.id!, !subTask.completed)}
                                    defaultChecked={subTask.completed}
                                    className="peer relative appearance-none  size-5 border rounded-xl border-blue-300  cursor-pointer    checked:bg-blue-300"></input>
                                <p>{subTask.title}</p>
                                {subTask.completed && <p>+1</p>}
                            </div>
                        ))}
                        <p className="text-xs text-text-primary text-center mt-5">{formatDistanceToNow(new Date(task.createdAt))} ago</p>
                    </div>

                </motion.div>
            </AnimatePresence>

        </>
    );
};

export default TaskCard;
