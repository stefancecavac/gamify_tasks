import { useState } from "react"
import RegisterModal from "../components/RegisterModal"
import LoginModal from "../components/LoginModal"



const Signup = () => {
    const [registerModal , setRegisterModal] = useState<boolean>(false)
    const [loginModal , setLoginModal] = useState<boolean>(false)

   


    return (
        <div className="flex  justify-center w-screen h-screen bg-primary">
            <div className="mt-20 m-5 w-full md:w-3/5 lg:w-2/5 lg:h-2/5 p-5 relative">
                <h1 className="text-text-primary text-3xl font-semibold text-center">Gamify your tasks with Quest Manager!</h1>
                <div className="flex items-center justify-center gap-10 mt-10">
                    <button onClick={() => setLoginModal(prev => !prev)} className="rounded-full bg-text-primary p-2 text-2xl text-primary font-bold">Login</button>
                    <button onClick={() => setRegisterModal(prev => !prev)} className="rounded-full bg-text-primary p-2 text-2xl text-primary font-bold">Register</button>
                </div>
                <LoginModal loginModal={loginModal} setLoginModal={setLoginModal}></LoginModal>
                <RegisterModal registerModal={registerModal} setRegisterModal={setRegisterModal}></RegisterModal>
            </div>
        </div>
    )
}

export default Signup