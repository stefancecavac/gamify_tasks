import { useSelector } from "react-redux"
import TasksComponent from "../components/TasksComponent"
import UseFetchUser from "../hooks/UseFetchUser"
import { RootState } from "../redux/store"

const Home = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    
   

    if(user){

        UseFetchUser(user.id)
    }
   


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen w-screen bg-gray-200 ">
            <p>Feature goes here</p>
            <TasksComponent />
            <p>Feature goes here</p>
        </div>
    )
}

export default Home
