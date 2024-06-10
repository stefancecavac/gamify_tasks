import { useState } from "react"
import NewTaskModal from "./NewTaskModal"


const NewTaskButton = () => {
    const [newTaskModal, setNewTaskModal] = useState<boolean>(false)

    return (
        <>
            <button onClick={() => setNewTaskModal(prev => !prev)} className=" border-2 border-pink-500  text-pink-500 rounded-full p-1 hover:bg-pink-500 hover:text-white transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
            <NewTaskModal newTaskModal={newTaskModal} setNewTaskModal={setNewTaskModal}></NewTaskModal>
        </>
    )
}

export default NewTaskButton