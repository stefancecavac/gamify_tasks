import { useState } from "react"
import NewTaskModal from "./NewTaskModal"
import { motion } from "framer-motion"


const NewTaskButton = () => {
    const [newTaskModal, setNewTaskModal] = useState<boolean>(false)

    return (
        <>
            <motion.button 
                whileHover={{ scale: 1.2}}
                onClick={() => setNewTaskModal(prev => !prev)}
                className="rounded-full p-1 bg-blue-300 text-text-primary font-semibold px-2 py-1 ">
                New Task
            </motion.button>
            <NewTaskModal newTaskModal={newTaskModal} setNewTaskModal={setNewTaskModal}></NewTaskModal>
        </>
    )
}

export default NewTaskButton