
import LoadingComponent from './LoadingComponent';
import { AnimatePresence, motion } from 'framer-motion';
import { habbitData } from '../models/Types';
import NewHabbitButton from './NewHabbitButton';
import { useFetchHabbits } from '../api/habbitApi';
import HabbitCard from './HabbitCard';

const HabbitComponent = () => {
    const {data:habbits , isLoading} = useFetchHabbits()

    return (
        <div className="flex flex-col relative  h-fit rounded-3xl p-5 row-span-full  ">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <h2 className="text-sm text-text-primary">My Habbits:</h2>
                    {habbits?.length > 0 && (
                        <p className=" text-text-primary text-sm font-bold rounded-full px-3 py-1 bg-green-300 ">
                            {habbits?.length}
                        </p>
                    )}
                </div>
                <NewHabbitButton />
            </div>

            <motion.div className="= flex flex-col transition-all ease-in-out  rounded-md gap-5  ">
                {habbits?.length === 0 ? (
                    <div>
                        <p className="flex items-center justify-center text-gray-400">Empty</p>
                    </div>
                ) : isLoading ? (
                        <LoadingComponent />
                ) : (
                    <AnimatePresence>
                        {habbits.map((habbit:habbitData, index:number) => (
                            <motion.div
                                key={habbit.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 0 }}
                                transition={{ duration: 0.1, delay: index * 0.1 }}>
                                <HabbitCard key={habbit.id} habbit={habbit} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                <div className="flex justify-center mt-5">
                    <p className="text-gray-400">Your habbits go here</p>
                </div>
            </motion.div>
            
        </div>
    );
};

export default HabbitComponent;
