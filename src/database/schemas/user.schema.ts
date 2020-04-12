import * as mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  salt: String
});

export default UserSchema;
