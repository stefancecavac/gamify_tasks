import TasksComponent from "../components/TasksComponent"

const Home = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen bg-gray-200 ">
            <p>Feature goes here</p>
            <TasksComponent />
            <p>Feature goes here</p>
        </div>
    )
}

export default Home
