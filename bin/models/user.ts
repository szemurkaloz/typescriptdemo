import { Schema, model, Document } from 'mongoose';  

export interface IUser{
    name: String,
    email: String,
    password: String
}

export interface IUserDocument extends Document, IUser {};

var userSchema = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

export var User = model<IUserDocument>('User', userSchema);