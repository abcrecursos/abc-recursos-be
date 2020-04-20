import { Address } from "../../locations/interfaces/address.interface";
import { Phone } from "../../phones/interfaces/phone.interface";
import { OrderItemDto } from  "./order-item.dto";
import { User } from  "../../users/interfaces/user";


export class CreateOrderDto {
  readonly person_name: string;
  readonly person_lastname: string;
  readonly email: string;

  readonly address: Address;
  readonly phone: Phone;

  readonly priority: number;
  readonly state: string;
  readonly healthCenter_id: string;

  readonly items: OrderItemDto[];
  readonly observations: string;


}
