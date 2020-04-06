import { Document } from 'mongoose';

export interface ProducerCategory extends Document {
  readonly name: string;
  readonly description: string;
}
