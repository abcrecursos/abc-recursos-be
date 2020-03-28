import * as mongoose from 'mongoose';

const ProviderSchema = new mongoose.Schema({
  name: String,
  description: String,
  priority: Number
});

export default ProviderSchema;
