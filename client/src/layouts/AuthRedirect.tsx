
import { useNavigate } from "react-router-dom"
import { ReactNode, useEffect, useState } from "react"
import { UseUserContext } from "../hooks/UseUserContext"



const AuthRedirect = ({children}:{children: ReactNode }) => {
  const {user} = UseUserContext()
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

   useEffect(() => {
    if(user){
      navigate('/' , {replace: true})
    }else{
      setIsLoading(false);
    }
   } , [user , navigate])

   return isLoading ? null : children
    
}

export default AuthRedirect
