import * as mongoose from 'mongoose';
import { SupplyTypes } from '../../constants/supplyTypes';
import { MeasureUnits } from '../../constants/measureUnits';

const SupplySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: { type: String, enum: Object.keys(SupplyTypes) },
  unit: { type: String, enum: Object.keys(MeasureUnits) },
  priority: { type: Number, default: 5 },
});

export default SupplySchema;
