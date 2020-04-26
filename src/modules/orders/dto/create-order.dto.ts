import { Person } from "../../people/interfaces/person";

import { OrderItemDto } from  "./order-item.dto";
import { User } from  "../../users/interfaces/user";


export class CreateOrderDto {
  readonly person: Person;

  readonly priority: number;
  readonly state: string;
  readonly healthCenter_id: string;

  readonly items: OrderItemDto[];
  readonly observations: string;


}
