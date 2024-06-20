import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { userData, userSchema } from "../models/Types";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import { AnimatePresence, motion } from "framer-motion";

interface LoginModalProps {
    loginModal: boolean;
    setLoginModal: (value: boolean) => void;
}
const LoginModal: React.FC<LoginModalProps> = ({ loginModal, setLoginModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<userData>({ resolver: zodResolver(userSchema) })
    const dispatch = useDispatch<AppDispatch>()
    const error = useSelector((state: RootState) => state.auth.error)

    const onSubmit = (data: userData) => {
        console.log('clicked')
        dispatch(loginUser(data))
    }

    return (
        <AnimatePresence>
            {loginModal &&
                <>
                    <motion.div onClick={() => setLoginModal(false)}
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`fixed top-0 left-0 w-screen h-screen  bg-black bg-opacity-50 z-50 `}>\
                    </motion.div>

                    <motion.form initial={{ scale: 0.5, opacity: 0 }} onSubmit={handleSubmit(onSubmit)}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className={`fixed h-fit justify-center top-20 m-auto right-0 left-0  w-3/12 z-50 flex flex-col items-center bg-white p-2 rounded-3xl`}>
                            <div className="flex">
                                <h2 className="text-5xl mb-10 p-2 font-bold text-primary">Login</h2>
                                <svg onClick={() => setLoginModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hover:cursor-pointer absolute size-8 right-5 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>

                            <label className="flex w-full px-10  font-bold flex-col text-text-primary">Email:
                                <input {...register('email')} className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" placeholder="Ex. hero@gmail.com">
                                </input>
                                {errors.email?.message && <span className="text-red-500 text-sm font-normal">{errors.email?.message}</span>}
                                {error && <div className="text-red-500 text-sm mb-5">{error}</div>}

                            </label>

                            <label className="flex  w-full px-10 font-bold flex-col text-text-primary">Password:
                                <input {...register('password')} className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" >
                                </input>
                                {errors.password?.message && <span className="text-red-500 text-sm font-normal">{errors.password?.message}</span>}
                                {error && <div className="text-red-500 text-sm  mb-5">{error}</div>}
                            </label>

                            <button type="submit" className="bg-primary rounded-2xl p-2 text-xl text-text-primary mt-5 transition-colors hover:bg-gradient-to-l ">Login</button>
                    </motion.form>
                </>}
        </AnimatePresence>
    )
}

export default LoginModal