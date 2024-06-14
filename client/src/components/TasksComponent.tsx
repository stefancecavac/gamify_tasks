import useFetchTasks from "../api/fetchTasks"
import LoadingComponent from "./LoadingComponent"
import NewTaskButton from "./NewTaskButton"
import TaskCard from "./TaskCard"


const TasksComponent = () => {
    const {tasks ,loading} = useFetchTasks()



    return (
        <div className=" flex flex-col m-10  relative mt-10 ">
            <div className="flex items-center justify-between mb-3 ">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl text-gray-500">My Tasks:</h2>
                   {tasks.length > 0 && <p className="text-xl text-white rounded-full px-3 py-1 bg-purple-500">{tasks.length}</p>} 
                </div>
                <NewTaskButton></NewTaskButton>
            </div>

            <div className="border-2 flex flex-col transition-all  ease-in-out border-gray-300 p-5 rounded-md gap-5 ">
                {tasks.length === 0 ?
                    <div>
                        <p className="flex items-center justify-center text-gray-400">Empty</p>
                    </div>
                    :
                    loading ? 
                    <LoadingComponent></LoadingComponent>
                    :
                 tasks && tasks.map((task) => (
                        <TaskCard  key={task.id} task={task}></TaskCard>
                    ))}
                <div className="flex justify-center mt-5">
                    <p className="text-gray-400">Your tasks go here</p>
                </div>

            </div>

        </div>
    )
}

export default TasksComponent

