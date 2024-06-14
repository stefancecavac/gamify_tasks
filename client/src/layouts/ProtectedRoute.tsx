
import { useNavigate } from "react-router-dom"
import { ReactNode, useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"



const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/signup', { replace: true })
    }

  }, [navigate, user])

  return user ? children : null;

}

export default ProtectedRoute