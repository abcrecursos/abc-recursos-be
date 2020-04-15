import { Document } from 'mongoose';

export interface LocalitiesRefes extends Document {
  readonly _id: string;
  readonly localidad: string;
}
