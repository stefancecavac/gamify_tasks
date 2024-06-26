import express from 'express'

const router = express.Router()

import { getHabbits , createHabbits, completeHabbit ,deleteHabit} from '../controllers/habbitController'

import authenticate from '../middleware/authentication'


router.use(authenticate)
router.get('/' , getHabbits)
router.patch('/:id' , completeHabbit)
router.post('/' , createHabbits)
router.delete('/:id' , deleteHabit)




export default router