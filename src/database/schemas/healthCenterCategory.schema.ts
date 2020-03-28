import * as mongoose from 'mongoose';

const HealthCenterCategorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default HealthCenterCategorySchema;
