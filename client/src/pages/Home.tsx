
import TasksComponent from "../components/TasksComponent";


const Home = () => {


    return (
        <div className="grid grid-flow-row auto-rows-fr md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 min-h-screen min-w-screen bg-gray-200">
          

            <TasksComponent />

         
        </div>
    );
}

export default Home;
