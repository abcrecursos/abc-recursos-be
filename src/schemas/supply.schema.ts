import * as mongoose from 'mongoose';

const SupplySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  priority: { type: Number, default: 5 },
});

export default SupplySchema;
