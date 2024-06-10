

import { useContext } from "react"
import { StateContext } from "../context/MainStateContext"



export const UseStateContext = () => {
    const context = useContext(StateContext)

    if(!context){
        throw Error('must be used inside of stateContext provider')
    }

    return context
}