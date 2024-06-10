
import { useNavigate } from "react-router-dom"
import { ReactNode, useEffect } from "react"
import { UseUserContext } from "../hooks/UseUserContext"



const AuthRedirect = ({children}:{children: ReactNode }) => {
  const {user} = UseUserContext()
  const navigate = useNavigate()

   useEffect(() => {
    if(user){
      navigate('/' , {replace: true})
    }
   } , [user , navigate])

   return children 
    
}

export default AuthRedirect
