import { useSelector } from "react-redux"
import LogoutButton from "./LogoutButton"
import { RootState } from "../redux/store"
import CurrencyBar from './CurrencyBar'

const Header = () => {
    const user = useSelector((state: RootState) => state.auth.user)


    return (

        <div className="flex justify-between items-center p-3 shadow-md  bg-amber-400">
            <h1 className="text-2xl font-bold text-neutral-700">TaskQuest</h1>
            <CurrencyBar></CurrencyBar>
            <div className="flex items-center gap-5">
                <svg version="1.0" id="Layer_1" className="size-8" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" fill="white"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> 
                    <path fill="#404040" d="M60,6h-7V4c0-2.211-1.789-4-4-4H15c-2.211,0-4,1.789-4,4v2H4c-2.211,0-4,1.789-4,4v8 c0,6.075,4.925,11,11,11h0.096C12.01,38.66,19.477,46.396,29,47.762V56h-7c-2.211,0-4,1.789-4,4v3c0,0.553,0.447,1,1,1h26 c0.553,0,1-0.447,1-1v-3c0-2.211-1.789-4-4-4h-7v-8.238C44.523,46.396,51.99,38.66,52.904,29H53c6.075,0,11-4.925,11-11v-8 C64,7.789,62.211,6,60,6z M6,18v-6h5v11C8.238,23,6,20.762,6,18z M39.712,21.048l-3.146,3.227l0.745,4.564 c0.062,0.378-0.099,0.758-0.411,0.979C36.728,29.938,36.525,30,36.323,30c-0.166,0-0.333-0.041-0.484-0.125l-3.841-2.123 l-3.841,2.123c-0.336,0.186-0.748,0.163-1.061-0.058s-0.473-0.601-0.411-0.979l0.745-4.564l-3.146-3.227 c-0.262-0.269-0.352-0.66-0.232-1.016s0.427-0.614,0.797-0.671l4.309-0.658l1.936-4.123c0.165-0.352,0.518-0.575,0.905-0.575 s0.74,0.224,0.905,0.575l1.936,4.123l4.309,0.658c0.37,0.057,0.678,0.315,0.797,0.671S39.974,20.779,39.712,21.048z M58,18 c0,2.762-2.238,5-5,5V12h5V18z"></path> <path fill="white" d="M33.255,20.036l-1.257-2.678l-1.257,2.678c-0.142,0.302-0.425,0.514-0.754,0.563l-2.913,0.445l2.141,2.194 c0.222,0.228,0.322,0.546,0.271,0.859l-0.495,3.03l2.522-1.396c0.151-0.083,0.317-0.125,0.484-0.125s0.333,0.042,0.484,0.125 l2.522,1.396l-0.495-3.03c-0.051-0.313,0.05-0.632,0.271-0.859l2.141-2.194L34.009,20.6C33.68,20.55,33.396,20.338,33.255,20.036z"></path> </g> </g>
                </svg>

                <svg fill="#404040" viewBox="0 -52 616 616" className="size-8" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                    <path d="M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z"></path></g>
                    </svg>

                <p className="text-neutral-700 text-xl">{user?.user_name}</p>

                <LogoutButton />
            </div>

        </div>
    )
}

export default Header 