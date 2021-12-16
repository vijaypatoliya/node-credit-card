import { CredModel } from '../models/index'

/** Add User */
const createCred = async (body: any) => {
    try {
        const result = await CredModel.create(body)
        return { _id: result._id }
    } catch (e: any) {
        throw new Error(e)
    }
}

/** Modify Cred */
const updateCred = async (body: any, id: string) => {
    try {
        await CredModel.findOneAndUpdate({ _id: id }, body).lean()
        return true
    } catch (e: any) {
        throw new Error(e)
    }
}

/** Get Cred by id */
const getOneCredByFilter = async (query: any) => {
    try {
        const result = await CredModel.findOne(query).lean()
        return result
    } catch (e: any) {
        throw new Error(e)
    }
}

/** Remove Cred */
const deleteCred = async (id: string) => {
    try {
        await CredModel.findOneAndDelete({ _id: id })
        return true
    } catch (e: any) {
        throw new Error(e)
    }
}

export default { createCred, updateCred, getOneCredByFilter, deleteCred }
