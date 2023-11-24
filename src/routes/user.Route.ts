import express from 'express'
import { userControllers } from '../controllers/userController'
const router = express.Router()

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:userId', userControllers.getSingleUser)
router.put('/:userId', userControllers.updateUser)
router.delete('/:userId', userControllers.deleteUser)
router.delete('/:userId/orders', userControllers.getUserOrders)

export const userRoutes = router
