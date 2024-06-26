import { useState } from "react"
import { motion } from "framer-motion"
import NewHabbitModal from "./NewHabbitModal"


const NewHabbitButton = () => {
    const [newHabbitModal, setNewHabbitModal] = useState<boolean>(false)

    return (
        <>
            <motion.button 
                whileHover={{ scale: 1.2}}
                onClick={() => setNewHabbitModal(prev => !prev)}
                className="rounded-full p-1 text-sm bg-green-300 text-text-primary font-semibold px-2 py-1 ">
                Add Habbit
            </motion.button>
            <NewHabbitModal newHabbitModal={newHabbitModal} setNewHabbitModal={setNewHabbitModal}></NewHabbitModal>
        </>
    )
}

export default NewHabbitButton