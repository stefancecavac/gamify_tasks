import { useDispatch } from "react-redux"
import TasksComponent from "../components/TasksComponent"
import { fetchUser } from "../redux/authSlice"
import { useEffect } from "react"
import { AppDispatch } from "../redux/store"

const Home = () => {
    const disptch = useDispatch<AppDispatch>()

    useEffect(() => {

        disptch(fetchUser())
    })


    return (
        <div className="transition-all ease-in-out grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen w-screen bg-gray-200 ">
            <p>Feature goes here</p>
            <TasksComponent />
            <p>Feature goes here</p>
        </div>
    )
}

export default Home
