import { NextFunction, Request, Response } from 'express'
import Boom from '@hapi/boom';
import moment from 'moment'
import userService from '../services/user.service'
import credService from '../services/cred.service'
import { responseMessage } from '../constants/message.constant'

const authControllerResponse = responseMessage.authControllerResponse
const credControllerResponse = responseMessage.credControllerResponse
/** Create cred */
const createCred = async (req: any, res: Response, next: NextFunction) => {
    try {
        const body: any = req.body
        const userId: string = req.params.userId
        /** Get user from db */
        const userObj: any = await userService.getOneUserByFilter({ _id: userId })
        if (!userObj) {
            next(Boom.badData(authControllerResponse.getUserError))
        }
        if (userObj.parentId !== String(req.user._id)) {
            next(Boom.badData(credControllerResponse.userRelationError))
        }
        const credDetails = await credService.createCred({
            credId: body.credId,
            credType: body.type,
            credNumber: body.cardNumber,
            securityCode: body.securityCode,
            expiryDate: moment(body.expiryDate, 'MM-DD-YYYY').format(),
            monthlyLimit: body.limit
        })
        if (!credDetails || !credDetails._id) {
            next(Boom.badData(credControllerResponse.createCredFailure))
        }
        await userService.updateUser({
            credId: credDetails._id, updatedAt: new Date() 
        }, userObj._id)
        res.status(200).send({
            message: credControllerResponse.createCredSuccess,
            data: credDetails
        })
    } catch (e: any) {
        next(Boom.badData(e.message))
    }
}

/**   Get one cred by id */
const getOneCred = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: any = req.params.id
        const userId: string = req.params.userId
        /** Get user from db */
        const userObj: any = await userService.getOneUserByFilter({ _id: userId })
        if (!userObj) {
            next(Boom.badData(authControllerResponse.getUserError))
        }
        /** Get cred details from db */
        const data: any = await credService.getOneCredByFilter({ _id: id })
        res.status(200).send({ message: credControllerResponse.fetchCredSuccess, data  })
    } catch (e: any) {
        next(Boom.badData(e.message))
    }
}

/** Update cred */
const updateCred = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.userId
        /** Get user from db */
        const userObj: any = await userService.getOneUserByFilter({ _id: userId })
        if (!userObj) {
            next(Boom.badData(authControllerResponse.getUserError))
        }
        if (userObj.parentId !== String(req.user._id)) {
            next(Boom.badData(credControllerResponse.userRelationError))
        }
        await credService.updateCred(req.body, req.params.id)
        return res.status(200).send({ message: credControllerResponse.updateCredSuccess })
    } catch (e: any) {
        return next(Boom.badData(e.message))
    }
}

/** Remove cred */
const deleteCred = async (req: any, res: Response, next: NextFunction) => {
    try {
        const userId: string = req.params.userId
        /** Get user from db */
        const userObj: any = await userService.getOneUserByFilter({ _id: userId })
        if (!userObj) {
            next(Boom.badData(authControllerResponse.getUserError))
        }
        if (userObj.parentId !== String(req.user._id)) {
            next(Boom.badData(credControllerResponse.userRelationError))
        }
        await credService.deleteCred(req.params.id)
        await userService.updateUser({ credId: null }, userId)
        return res.status(200).send({ message: credControllerResponse.deleteCredSuccess })
    } catch (e: any) {
        return next(Boom.badData(e.message))
    }
}

export { createCred, getOneCred, updateCred, deleteCred }
