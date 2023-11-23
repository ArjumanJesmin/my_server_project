import express from 'express'
import { userControllers } from '../controllers/userController'
const router = express.Router()



router.post('/', userControllers.createUser)

export const userRoutes = router