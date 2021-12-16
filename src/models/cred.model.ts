import mongoose, {Schema} from 'mongoose'

mongoose.set('useCreateIndex', true)

export interface ICred extends mongoose.Document {
    credId: string,
    credType: string,
    credNumber: string,
    securityCode: string,
    expiryDate: Date,
    monthlyLimit: string
}

export type createCredType = {
    credId: string,
    credType: string,
    credNumber: string,
    securityCode: string,
    expiryDate: Date,
    monthlyLimit: string,
}

export type getCredType = {
    _id?: string,
    credId: string,
    credType: string,
    credNumber: string,
    securityCode: string,
    expiryDate: Date,
    monthlyLimit: string,
}

export const CredSchema = new Schema({
    credId: { type: String, required: true, index: true },
    credType: { type: String, required: true, index: true },
    credNumber: { type: String, required: true },
    securityCode: { type: String, required: true },
    monthlyLimit: { type: String, required: true },
    expiryDate: { type: Date, required: true },
    createdAt: {
        type: Date, default: () => {
            return new Date()
        },
    },
    updatedAt: {type: Date},
}, {strict: 'throw'})

export const CredModel = mongoose.model<ICred>('cred', CredSchema)
