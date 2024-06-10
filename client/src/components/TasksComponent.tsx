import UseFetchTasks from "../hooks/UseFetchTasks"
import LoadingComponent from "./LoadingComponent"
import NewTaskButton from "./NewTaskButton"
import TaskCard from "./TaskCard"


const TasksComponent = () => {
    const { loading, error, tasks } = UseFetchTasks()

    if (loading) return <LoadingComponent></LoadingComponent>

    return (
        <div className=" flex flex-col p-5 m-10  relative gap-5 mt-10 ">
            <div className="flex items-center justify-between ">
                <h2 className="text-2xl text-gray-600">My Tasks:</h2>
                <NewTaskButton></NewTaskButton>
            </div>

            {tasks.length === 0 ?
                <div>
                    <p className="flex  items-center justify-center mt-20">No Tasks found</p>
                </div>
                :
                tasks && tasks.map((task) => (
                    <TaskCard key={task.id} task={task}></TaskCard>
                ))}



        </div>
    )
}

export default TasksComponent

