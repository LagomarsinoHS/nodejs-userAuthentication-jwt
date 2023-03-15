import express from 'express'
import { getUsers, createUser, loginUser } from '../controllers/user.controller.js'

const router = express.Router()

// Estas direcciones es como si fuese /users/
router.get('/', getUsers)
router.post('/', createUser)
// Esta como /users/login
router.post('/login', loginUser)


export default router;