import { Schema, Document } from 'mongoose';

export interface User extends Document {

	username: string,
	password: string,
	salt: string
}