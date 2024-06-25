import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { taskData, taskSchema } from "../models/Types";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateTask } from "../api/tasksApi";

interface TaskModalProps {
    newTaskModal: boolean;
    setNewTaskModal: (value: boolean) => void;
}

const NewTaskModal: React.FC<TaskModalProps> = ({ newTaskModal, setNewTaskModal }) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<taskData>({ resolver: zodResolver(taskSchema) });
    const { fields, append, remove } = useFieldArray({ control, name: "subTasks" })

    const {mutate , isPending} = useCreateTask()


    const handleCreate = async (data: taskData) => {
        data.subTasks = data.subTasks?.filter(subTask => subTask.title?.trim() !== "")
        mutate(data);
    };


    return (
        <AnimatePresence>
            {newTaskModal &&
                <>
                    <motion.div onClick={() => setNewTaskModal(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`fixed top-0 left-0 w-screen h-screen  bg-primary/30 z-50 `}>
                    </motion.div>

                    <motion.form
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        onSubmit={handleSubmit(handleCreate)}
                        className="z-50 shadow-md fixed flex flex-col right-0 left-0 mx-5 md:m-auto top-10 overflow-hidden  bg-white rounded-3xl md:w-4/6 lg:w-2/6 ">

                        <div className="flex justify-between items-center m-5">
                            <p className="flex font-bold flex-col text-2xl text-text-primary ">New Task</p>
                            <motion.svg onClick={() => setNewTaskModal(false)}
                                whileHover={{ scale: 1.2 }}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-8  text-primary  rounded-full bg-gray-200 p-1 border-2 border-primary hover:cursor-pointer">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </motion.svg>
                        </div>

                        <label className="flex w-full px-10 font-bold flex-col text-text-primary ">Task name:
                            <input className="mt-1 p-2 rounded-xl text-gray-500 bg-gray-200" {...register('title')}></input>
                            {errors.title?.message && <span className="text-red-500 font-normal">{errors.title.message}</span>}
                        </label>

                        <div className="px-10 mt-10 ">
                            <div className="flex justify-between items-center">
                                <label className="flex w-full font-bold  text-text-primary ">Subtasks:</label>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    className="bg-primary rounded-2xl p-1  text-white  " type="button" onClick={() => append({ title: '', completed: false })}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </motion.button>
                            </div>

                            {fields.map((subTask, index) => (
                                <div key={subTask.id}>
                                    <div className="relative flex">
                                        <input className="mt-5 p-1 w-full  text-gray-500 border-b-2 border-primary outline-none"
                                            {...register(`subTasks.${index}.title`)}
                                        />
                                        <motion.svg
                                            whileHover={{ scale: 1.3 }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => remove(index)}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6 absolute right-0 top-5 text-red-500 hover:cursor-pointer ">
                                            <path strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </motion.svg>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                animate={errors.title ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                                transition={{ duration: 0.2 }}
                                disabled={isPending} type="submit"
                                className="bg-primary rounded-2xl p-2 text-xl text-white mt-5 m-5 ">{isPending ? 'Creating ...' : 'Create task'}</motion.button>
                        </div>
                    </motion.form>
                </>}
        </AnimatePresence>
    );
}

export default NewTaskModal;
