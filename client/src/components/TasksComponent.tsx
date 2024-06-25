
import LoadingComponent from './LoadingComponent';
import NewTaskButton from './NewTaskButton';
import TaskCard from './TaskCard';
import { AnimatePresence, motion } from 'framer-motion';
import { taskData } from '../models/Types';
import { useFetchTasks } from '../api/tasksApi';

const TasksComponent = () => {
    const {data:tasks, isLoading} = useFetchTasks()

    return (
        <div className="flex flex-col relative  h-fit rounded-3xl p-5 row-span-full  ">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl text-text-primary">My Tasks:</h2>
                    {tasks?.length > 0 && (
                        <p className=" text-text-primary font-bold rounded-full px-3 py-1 bg-blue-300 ">
                            {tasks?.length}
                        </p>
                    )}
                </div>
                <NewTaskButton />
            </div>

            <motion.div className="= flex flex-col transition-all ease-in-out  rounded-md gap-5  ">
                {tasks?.length === 0 ? (
                    <div>
                        <p className="flex items-center justify-center text-gray-400">Empty</p>
                    </div>
                ) : isLoading ? (
                        <LoadingComponent />
                ) : (
                    <AnimatePresence>
                        {tasks.map((task:taskData, index:number) => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 0 }}
                                transition={{ duration: 0.1, delay: index * 0.1 }}>
                                <TaskCard key={task.id} task={task} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                <div className="flex justify-center mt-5">
                    <p className="text-gray-400">Your tasks go here</p>
                </div>
            </motion.div>
            
        </div>
    );
};

export default TasksComponent;
