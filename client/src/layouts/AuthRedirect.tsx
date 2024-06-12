
import { useNavigate } from "react-router-dom"
import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"



const AuthRedirect = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true })
    }

  } , [navigate , user])

  return children

}

export default AuthRedirect
