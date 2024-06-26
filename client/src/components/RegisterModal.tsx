import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { userData, userSchema } from "../models/Types";
import { AnimatePresence, motion } from "framer-motion";
import { UseAuthContext } from "../context/authContext";


interface RegisterModalProps {
    registerModal: boolean;
    setRegisterModal: (value: boolean) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ registerModal, setRegisterModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<userData>({ resolver: zodResolver(userSchema) })
    const {register:registerUser} = UseAuthContext()

    const onSubmit = (data: userData) => {
        registerUser(data)
    }


    return (
        <AnimatePresence>
        {registerModal &&
        <>
            <motion.div onClick={() => setRegisterModal(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`fixed top-0 left-0 w-screen h-screen  bg-black bg-opacity-50 z-50 `}>\
            </motion.div>

            <motion.form  initial={{ scale: 0.5  , opacity:0}} onSubmit={handleSubmit(onSubmit)}
                        animate={{ scale: 1 , opacity:1}}
                        exit={{ scale: 0.5, opacity:0 }}
            className={`fixed h-fit justify-center top-20 m-auto  w-4/5 right-0 left-0 sm:w-6/12 lg:w-3/12 z-50 flex flex-col items-center bg-white p-2 rounded-3xl`}>
                    <div className="flex">
                        <h2 className="text-5xl mb-10 p-2 font-bold text-primary">Register</h2>
                        <svg onClick={() => setRegisterModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hover:cursor-pointer absolute size-8 right-5 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <label className="flex w-full px-10 font-bold flex-col text-text-primary">Username:
                        <input {...register('user_name')} className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" placeholder="Ex. QuestHero">
                        </input>
                        {errors.user_name?.message && <span className="text-red-500 text-sm font-normal">{errors.user_name?.message}</span>}
                    </label>

                    <label className="flex w-full px-10 font-bold flex-col text-text-primary">Email:
                        <input {...register('email')} className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" placeholder="Ex. hero@gmail.com">
                        </input>
                        {errors.email?.message && <span className="text-red-500 text-sm font-normal">{errors.email?.message}</span>}
                    </label>

                    <label className="flex w-full px-10 font-bold flex-col text-text-primary">Password:
                        <input {...register('password')} type="password" className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" >
                        </input>
                        {errors.password?.message && <span className="text-red-500 text-sm font-normal">{errors.password?.message}</span>}
                    </label>

                    <button type="submit" className="bg-primary rounded-2xl p-2 text-xl text-text-primary mt-5 transition-colors hover:bg-gradient-to-l ">Register</button>
                    
            </motion.form>
        </>}
        </AnimatePresence>
    )
}

export default RegisterModal