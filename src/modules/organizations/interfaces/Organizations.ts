import { Document } from 'mongoose';
import { Phone } from '../../phones/interfaces/phone.interface';
import { Address } from '../../locations/interfaces/address.interface';

export interface Organizations extends Document {
  readonly name: string;
  readonly description: string;
  readonly address: Address;
  readonly phone: Phone;
}
