import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from '../components/Footer'


const MainLayout = () => {


    return(
        <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    )
}

export default MainLayout