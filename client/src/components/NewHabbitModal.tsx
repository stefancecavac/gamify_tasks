import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { habbitData, habbitSchema} from "../models/Types";
import { AnimatePresence, motion } from "framer-motion";
import { useCreateHabbit } from "../api/habbitApi";

interface HabitModalProps {
    newHabbitModal: boolean;
    setNewHabbitModal: (value: boolean) => void;
}

const NewHabbitModal: React.FC<HabitModalProps> = ({ newHabbitModal, setNewHabbitModal }) => {
    const { register, handleSubmit, formState: { errors }} = useForm<habbitData>({ resolver: zodResolver(habbitSchema) });

    const {isPending , mutate} = useCreateHabbit()

    const handleCreate = async (data: habbitData) => {
        mutate(data)
    };


    return (
        <AnimatePresence>
            {newHabbitModal &&
                <>
                    <motion.div onClick={() => setNewHabbitModal(false)}
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
                            <p className="flex font-bold flex-col text-2xl text-text-primary ">New Habbit</p>
                            <motion.svg onClick={() => setNewHabbitModal(false)}
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

                        <label className="flex w-full px-10 font-bold flex-col text-text-primary ">Habit name:
                            <input className="mt-1 p-2 rounded-xl text-gray-500 bg-gray-200" {...register('title')}></input>
                            {errors.title?.message && <span className="text-red-500 font-normal">{errors.title.message}</span>}
                        </label>

                        
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

export default NewHabbitModal;
