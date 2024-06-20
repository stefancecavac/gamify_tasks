import express from 'express'

const router = express.Router()

import {getAllTasks , createTask , getSingleTask  , completeTask  , completeSubTask} from '../controllers/taskController'
import authenticate from '../middleware/authentication'


router.use(authenticate)
router.get('/' , getAllTasks)
router.get('/:id' , getSingleTask)
router.post('/' , createTask)


router.patch('/subTask/:id' , completeSubTask)


router.delete('/:id/complete' , completeTask)




export default router