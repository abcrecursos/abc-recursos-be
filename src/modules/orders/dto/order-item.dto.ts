import { Validate, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { SupplyExists } from '../../supplies';

export class OrderItemDto {

  //TODO colocar mensajes de error en constantes y agregarlos acá

  @Validate(SupplyExists)
  readonly supplyId: string;

  @Min(1)
  readonly quantity: number;
}
