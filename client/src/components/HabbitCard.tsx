import { habbitData } from "../models/Types";
import { AnimatePresence, motion } from "framer-motion";
import LoadingComponent from "./LoadingComponent";
import { useCompleteHabbit, useDeleteHabbit } from "../api/habbitApi";


const HabbitCard: React.FC<{ habbit: habbitData }> = ({ habbit }) => {
    const { mutate: completeHabit, isPending } = useCompleteHabbit()
    const { mutate: deleteHabbit } = useDeleteHabbit()


    const handleComplete = (id: number, status: boolean) => {
        completeHabit({ id, status });
    };

    const handleDelete = (id: number) => {
        deleteHabbit(id)
    }

    return (
        <>
            <AnimatePresence>
                <motion.div whileHover={{ scale: 1.1 }}
                    className={`rounded-md   flex shadow-md overflow-hidden bg-white`}>
                    <div className="p-2 flex-1 flex-col overflow-hidden">
                        <div className="flex justify-between items-center">
                            <p className={`font-bold text-xl ${habbit.status ? 'text-green-300' : 'text-gray-400'}`}>{habbit.title}</p>
                            <p className="text-sm text-text-primary">Streak: {habbit.streak}</p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-5">
                            <motion.svg
                                whileHover={{ scale: 1.3 }}
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleDelete(habbit.id!)}
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6  text-red-400 hover:cursor-pointer ">
                                <path strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </motion.svg>
                        </div>
                    </div>

                    <div className={` p-2 flex items-center ${habbit.status ? 'bg-green-300' : 'bg-gray-300'}`}>
                        {isPending ?
                            <LoadingComponent></LoadingComponent>
                            :

                            <input type="checkbox"
                                onChange={() => handleComplete(habbit.id!, !habbit.status)}
                                checked={habbit.status}
                                className="
                                appearance-none size-4  rounded-sm bg-white
                                mt-1 shrink-0
                                checked:bg-green-600 checked:border-0"></input>
                        }
                    </div>

                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default HabbitCard;
