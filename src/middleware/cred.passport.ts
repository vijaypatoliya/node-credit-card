import { Response, NextFunction } from 'express'
import { verifyToken } from '../lib/utils/utils'
import userService from '../services/user.service'
import Boom from '@hapi/boom'

export default async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const accessToken: string | null = req.headers['x-access-token'] as string;

    if (!accessToken) {
        next(Boom.badRequest('Missing access token'));
    } else {
        try {
            const details = await verifyToken(accessToken)
            const userDetails = await userService.getOneUserByFilter({ email: details?.email, type: 'PARENT' })
            if (!userDetails) {
                throw new Error('User not authorized');
            }
            req.user = userDetails
            next();
        } catch (err) {
            next(Boom.badRequest('User not authorized'));
        }
    }
}
