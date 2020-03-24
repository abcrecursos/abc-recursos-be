import { Document } from 'mongoose';

export interface HealthCenter extends Document {
  readonly name: string;
  readonly description: string;
  readonly address: any;
  readonly location: any;
  readonly type: any;
}
