import { NextFunction, Request, Response } from 'express'
import Boom from '@hapi/boom';
import { encrypt, getToken } from '../lib/utils/utils'
import usersService from '../services/user.service'

import { responseMessage } from '../constants/message.constant'

const authControllerResponse = responseMessage.authControllerResponse

/** Confirm admin user signIn with verificationCode */
const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params: { email: string, password: string } = req.body
    const user = await usersService.getOneUserByFilter({ email: params.email, password: encrypt(params.password) })
    if (!user) {
      next(Boom.badData(authControllerResponse.userNotAuthorizationError))
    }
    const token: string = getToken({ email: user.email })
    res.status(200).json({
      message: authControllerResponse.loginSuccess,
      data: { _id: user._id, email: user.email, token }
    })
  } catch (e: any) {
    next(Boom.badData(e.message))
  }
}


/** Add User */
const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    if (body.type === 'CHILD') {
      if (!body.parentId) {
        next(Boom.badData(authControllerResponse.parentIdMissingError))
      }
      const parentDetails = await usersService.getOneUserByFilter({ _id: body.parentId, type: 'PARENT' })
      if (!parentDetails) {
        next(Boom.badData(authControllerResponse.getParentDetailsError))
      }
    }
    /** Get user from db */
    const user: any = await usersService.getOneUserByFilter({ email: req.body.email })
    if (user) {
      next(Boom.badData(authControllerResponse.userAlreadyExistError))
    }
    await usersService.createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      age: body.age,
      type: body.type,
      parentId: body.parentId
    })
    res.status(200).send({ message: authControllerResponse.signUpSuccess })
  } catch (e: any) {
    next(Boom.badData(e.message))
  }
}

export default { signInUser, signUpUser }
