import Header from "../components/Header"
import Footer from '../components/Footer'
import { ReactNode } from "react"


const Layout = ({ children }: { children: ReactNode }) => {


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout