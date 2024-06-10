import { useContext } from "react"
import { UserContext } from "../context/UserContext"



export const UseUserContext = () => {
    const context = useContext(UserContext)

    if(!context){
        throw Error('must be used inside of usercontext provider')
    }

    return context
}