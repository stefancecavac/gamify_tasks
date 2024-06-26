
import TasksComponent from "../components/TasksComponent";
import HabbitComponent from "../components/HabbitComponent";


const Home = () => {


    return (
        <div className="flex flex-col md:grid grid-flow-row auto-rows-fr md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 min-h-screen min-w-screen bg-gray-200">
          

            <TasksComponent />
            <HabbitComponent />

         
        </div>
    );
}

export default Home;
