import { Address } from '../../locations/interfaces/address.interface';
import { Phone } from '../../phones/interfaces/phone.interface';
import { Person } from "../../people/interfaces/person";
import {SupplyItemDto} from './supplyItem.dto';

export class CreateProducerDto {
  readonly person: Person;
  readonly name: string;
  readonly cuit: string;
  readonly description: string;
  readonly address: Address;
  readonly phone: Phone;
  readonly supply: SupplyItemDto[];
}
