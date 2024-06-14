import express from 'express'
const router = express.Router()

import { registerUser , loginUser , logoutUser , getUser } from '../controllers/userController'
import authenticate from '../middleware/authentication'

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.use(authenticate)
router.get('/', getUser )
export default router
