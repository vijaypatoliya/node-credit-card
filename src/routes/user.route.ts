import express, { Router } from 'express'
import {
  getOneUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller'
import userPassport from '../middleware/user.passport'

const router: Router = express.Router()

router.put('/:id', userPassport, updateUser)
router.get('/:id', userPassport, getOneUser)
router.delete('/:id', userPassport, deleteUser)

export default router
