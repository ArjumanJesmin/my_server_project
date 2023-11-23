import express from 'express'
import { userControllers } from '../controllers/userController'
const router = express.Router()



router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)

export const userRoutes = router
