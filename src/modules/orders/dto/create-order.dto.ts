import { ValidateNested, Validate, IsOptional, Min, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

import { CreatePersonDto } from "../../people";
import { HealthCenterExists } from '../../health-centers';
import { OrderItemDto } from  "./order-item.dto";


export class CreateOrderDto {

  //TODO colocar mensajes de error en constantes y agregarlos para retornar.
  //TODO colocar validacion para 'state'

  @ValidateNested()
  @Type(() => CreatePersonDto)
  readonly person: CreatePersonDto;

  @Min(1)
  readonly priority: number;

  @Validate(HealthCenterExists)
  readonly healthCenterId: string;

  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => OrderItemDto)
  readonly items: OrderItemDto[];

  @IsOptional()
  readonly observations: string;
}
