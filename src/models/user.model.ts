import mongoose, {Schema} from 'mongoose'

mongoose.set('useCreateIndex', true)

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    age?: string,
    type: 'CHILD' | 'PARENT',
    credId?: string,
    parentId?: string
}

export type createUserType = {
    name: string,
    email: string,
    password: string,
    age?: string,
    type: 'CHILD' | 'PARENT',
    credId?: string,
    parentId?: string
}

export type getUserType = {
    _id?: string,
    name: string,
    email: string,
    age?: string,
    type: 'CHILD' | 'PARENT',
    credId?: string,
    parentId?: string
}

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    password: { type: String, required: true },
    age: { type: String },
    type: { type: String, required: true },
    credId: {type: String, default: null },
    parentId: { type: String, default: null },
    createdAt: {
        type: Date, default: () => {
            return new Date()
        },
    },
    updatedAt: {type: Date},
}, {strict: 'throw'})

export const UserModel = mongoose.model<IUser>('user', UserSchema)
