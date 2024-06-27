import { createContext, useContext, useState, ReactNode } from "react";
import Toast from "../components/Toast";

type ToastMessage = {
    reward: number;
};

type ToastContextType = {
    showToast: (toastMessage: ToastMessage) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | null>(null);

    const showToast = (toastMessage: ToastMessage) => {
        setToast(toastMessage);
    };

    const handleClose = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {toast && (
                <Toast
                    reward={toast.reward}
                    onClose={handleClose}
                />
            )}
            {children}
        </ToastContext.Provider>
    );
};

export const UseToastContext = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToastContext must be used within a ToastContextProvider");
    }
    return context;
};
