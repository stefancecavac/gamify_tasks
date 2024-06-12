import express from 'express'
const router = express.Router()

import { registerUser , loginUser , logoutUser , getUser } from '../controllers/userController'

router.get('/:id', getUser )
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)


export default router
