import express from 'express'

const router = express.Router()

import {getAllTasks , createTask , getSingleTask ,deleteTask , completeTask} from '../controllers/taskController'
import authenticate from '../middleware/authentication'


router.use(authenticate)
router.get('/' , getAllTasks)
router.get('/:id' , getSingleTask)
router.post('/' , createTask)
router.delete('/:id' , deleteTask)
router.delete('/:id/complete' , completeTask)




export default router