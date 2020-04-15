import * as mongoose from 'mongoose';

const LocalitiesRefesSchema = new mongoose.Schema({
  _id: String,
  localidad: String,
});

export default LocalitiesRefesSchema;
