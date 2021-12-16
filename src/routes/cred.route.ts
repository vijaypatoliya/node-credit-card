import express, { Router } from 'express'
import {
  createCred,
  updateCred,
  deleteCred,
  getOneCred
} from '../controllers/cred.controller'
import credPassport from '../middleware/cred.passport'

const router: Router = express.Router()

router.post('/:userId', credPassport, createCred)
router.put('/:id/:userId', credPassport, updateCred)
router.delete('/:id/:userId', credPassport, deleteCred)
router.get('/:id/:userId', credPassport, getOneCred)

export default router
