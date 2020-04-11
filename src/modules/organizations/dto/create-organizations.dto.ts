import { Address } from "../../locations/interfaces/address.interface";
import { Phone } from "../../phones/interfaces/phone.interface";

export class CreateOrganizationsDto {
  readonly name: string;
  readonly description: string;
  readonly address: Address;
  readonly phone: Phone;
}
