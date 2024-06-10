import TasksComponent from "../components/TasksComponent"

const Home = () => {
    return (
        <div className="grid grid-cols-3 h-screen bg-gray-200 justify-center">
            <TasksComponent></TasksComponent>   
          
        </div>
    )
}

export default Home