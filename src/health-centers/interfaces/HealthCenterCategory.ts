import { Document } from 'mongoose';

export interface HealthCenterCategory extends Document {
  readonly name: string;
  readonly description: string;
}
