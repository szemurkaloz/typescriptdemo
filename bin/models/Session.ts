import { Schema, model, Document } from 'mongoose';
import { IUserDocument } from './User';

export interface  ISession {
  sid: string,
  user: IUserDocument  
}

export interface ISessionDocument extends Document , ISession {
    
}

var sessionSchema = new Schema({
    sid: {type: String, unique: true},
    user: {type: String, ref:'User', required: true} 
})

export var Session = model<ISessionDocument>('Session', sessionSchema)