import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastProps = {
    reward: number;
    onClose: () => void;
};

const Toast = ({ reward, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ top: -30 }}
                animate={{ top: 40 }}
                exit={{ top: -30 }}
                transition={{ duration: 0.2 }}
                className="bg-white shadow-md flex items-center justify-center px-3 py-2 rounded-full gap-5 z-50 fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                <p className="text-4xl font-bold text-text-primary">+ {reward}</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="yellow"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-12 text-yellow-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                </svg>
            </motion.div>
        </AnimatePresence>
    );
};

export default Toast;
