import express from 'express'

const router = express.Router()

import {getAllTasks , createTask , getSingleTask ,deleteTask} from '../controllers/taskController'
import authenticate from '../middleware/authentication'


router.use(authenticate)
router.get('/' , getAllTasks)
router.get('/:id' , getSingleTask)
router.post('/' , createTask)
router.delete('/:id' , deleteTask)



export default router