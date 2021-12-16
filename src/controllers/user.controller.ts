import { NextFunction, Request, Response } from 'express'
import Boom from '@hapi/boom';

import userService from '../services/user.service'
import { responseMessage } from '../constants/message.constant'

const authControllerResponse = responseMessage.authControllerResponse

/**  Get one user by id */
const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: any = req.params.id
        /** Get user from db */
        const userObj: any = await userService.getOneUserByFilter({ _id: id })
        res.status(200).send({ message: authControllerResponse.getUserSuccess, data: userObj })
    } catch (e: any) {
        next(Boom.badData(e.message))
    }
}

/** Update user */
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await userService.updateUser(req.body, req.params.id)
        return res.status(200).send({ message: authControllerResponse.userUpdateSuccess })
    } catch (e: any) {
        return next(Boom.badData(e.message))
    }
}

/** Remove User */
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: any = req.params.id
        /** Get user from db */
        const userObj: any = await userService.getOneUserByFilter({ _id: id })
        
        if (userObj.type === 'PARENT') {
            const child = await userService.getOneUserByFilter({ parentId: id, type: 'CHILD' })
            if (child) {
                throw new Error(authControllerResponse.childDependencyError)
            }
        }
        await userService.deleteUser(req.params.id)
        return res.status(200).send({ message: authControllerResponse.userAlreadyExistError })
    } catch (e: any) {
        return next(Boom.badData(e.message))
    }
}

export { getOneUser, updateUser, deleteUser }
