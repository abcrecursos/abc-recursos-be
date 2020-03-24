import { Document } from 'mongoose';

export interface Supply extends Document {
  readonly name: string;
  readonly description: string;
  readonly priority: number;
}
