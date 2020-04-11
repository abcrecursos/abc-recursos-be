import * as mongoose from 'mongoose';

const ProducerCategorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default ProducerCategorySchema;
