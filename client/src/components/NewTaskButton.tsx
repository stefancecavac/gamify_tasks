import { useState } from "react"
import NewTaskModal from "./NewTaskModal"


const NewTaskButton = () => {
    const [newTaskModal, setNewTaskModal] = useState<boolean>(false)
   
    return (
        <>
        <button onClick={() => setNewTaskModal(prev => !prev)} className="bg-gradient-to-r from-indigo-500 border-2 via-purple-500 to-pink-500 rounded-2xl p-2
         text-white hover:from-white  hover:text-pink-500 hover:border-pink-500 transition-all">New Task</button>
          <NewTaskModal newTaskModal={newTaskModal} setNewTaskModal={setNewTaskModal}></NewTaskModal>
        </>
    )
}

export default NewTaskButton