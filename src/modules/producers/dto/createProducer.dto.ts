import { Address } from '../../locations/interfaces/address.interface';
import { Phone } from '../../phones/interfaces/phone.interface';

export class CreateProducerDto {
  readonly name: string;
  readonly description: string;
  readonly address: Address;
  readonly phone: Phone;
}
