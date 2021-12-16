import { UserModel } from '../models/index'
import { getToken, encrypt } from '../lib/utils/utils'

/** Add User */
const createUser = async (body: any) => {
    try {
        body.password = encrypt(body.password)
        const result = await UserModel.create(body)
        const token: string = getToken({ email: result.email })
        return { _id: result._id, email: result.email, token }
    } catch (e: any) {
        throw new Error(e)
    }
}

/** Modify User */
const updateUser = async (body: any, id: string) => {
    try {
        if (body.password) {
            body.password = encrypt(body.password)
        }
        await UserModel.findOneAndUpdate({ _id: id }, body).lean()
        return true
    } catch (e: any) {
        throw new Error(e)
    }
}

/** Get user by id */
const getOneUserByFilter = async (query: any) => {
    try {
        const result = await UserModel.findOne(query).select('-password').lean()
        return result
    } catch (e: any) {
        throw new Error(e)
    }
}

/** Remove User */
const deleteUser = async (id: string) => {
    try {
        await UserModel.findOneAndDelete({ _id: id })
        return true
    } catch (e: any) {
        throw new Error(e)
    }
}

export default { createUser, updateUser, getOneUserByFilter, deleteUser }
