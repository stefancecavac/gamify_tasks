import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { userData, userSchema } from "../models/Types";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { AppDispatch, RootState } from "../redux/store";

interface RegisterModalProps {
    registerModal: boolean;
    setRegisterModal: (value: boolean) => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ registerModal, setRegisterModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<userData>({ resolver: zodResolver(userSchema) })
    const dispatch = useDispatch<AppDispatch>()
    const error = useSelector((state:RootState) => state.auth.error)

    const onSubmit = (data: userData) => {
        dispatch(registerUser(data))
    }


    return (
        <div className={`absolute h-fit top-0 right-0 left-0 w-full bg-white p-5 rounded-2xl ${registerModal ? 'block animate-modal' : 'hidden'}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                <div className="flex">
                    <h2 className="text-5xl mb-10 p-2 font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Register</h2>
                    <svg onClick={() => setRegisterModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hover:cursor-pointer absolute size-8 right-5 text-red-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <label className="flex w-3/5 font-bold flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">Username:
                    <input {...register('user_name')} className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" placeholder="Ex. QuestHero">
                    </input>
                    {errors.user_name?.message && <span className="text-red-500 text-sm font-normal">{errors.user_name?.message}</span>}
                </label>

                <label className="flex w-3/5 font-bold flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">Email:
                    <input {...register('email')} className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" placeholder="Ex. hero@gmail.com">
                    </input>
                    {errors.email?.message && <span className="text-red-500 text-sm font-normal">{errors.email?.message}</span>}
                </label>

                <label className="flex w-3/5 font-bold flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">Password:
                    <input {...register('password')} type="password" className="mt-2 p-2 rounded-2xl text-gray-500 bg-gray-200" >
                    </input>
                    {errors.password?.message && <span className="text-red-500 text-sm font-normal">{errors.password?.message}</span>}
                </label>

                <button type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-2 text-xl text-white mt-5 transition-colors hover:bg-gradient-to-l ">Register</button>
            {error && <div>{error}</div>}
            </form>
        </div>
    )
}

export default RegisterModal