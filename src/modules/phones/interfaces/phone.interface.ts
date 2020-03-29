import { PhoneTypes } from 'src/constants/phoneTypes';

export interface Phone {
  readonly prefix: string;
  readonly number: string;
  readonly type: PhoneTypes;
}
