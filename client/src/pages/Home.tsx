import TasksComponent from "../components/TasksComponent"
import UseFetchUser from "../hooks/UseFetchUser"
import { UseUserContext } from "../hooks/UseUserContext"

const Home = () => {
    const {user} = UseUserContext()
    if(!user){
        return <p>no user</p>
    }
    UseFetchUser(user.id)



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen w-screen bg-gray-200 ">
            <p>Feature goes here</p>
            <TasksComponent />
            <p>Feature goes here</p>
        </div>
    )
}

export default Home
