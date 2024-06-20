import { motion } from 'framer-motion';

const rewardVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 5 } },
    exit: { opacity: 0, scale: 0, transition: { duration: 5 } }
};

const RewardAnimation: React.FC = () => {
    return (
        <motion.div
        variants={rewardVariants}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-5 rounded-xl shadow-lg"
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            Task Completed! 🎉
        </motion.div>
    );
};

export default RewardAnimation;