
import { useNavigate } from "react-router-dom"
import { ReactNode, useEffect } from "react"
import { UseUserContext } from "../hooks/UseUserContext"



const ProtectedRoute = ({children}:{children: ReactNode }) => {
  const {user} = UseUserContext()
    const navigate = useNavigate()

   useEffect(() => {
    if(!user){
    navigate('/signup' , {replace: true})
    }
   } , [user , navigate])

   return children
    
}

export default ProtectedRoute