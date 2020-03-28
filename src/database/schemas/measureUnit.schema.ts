import * as mongoose from 'mongoose';

const MeasureUnitSchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default MeasureUnitSchema;
