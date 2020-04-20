import { IsPositive, Validate } from 'class-validator';
import { SupplyExists } from '../../supplies';

export class DonationItemDto {
	
  @Validate(SupplyExists)
  readonly supply_id: string;

  //TODO definir mensajes de error
  @IsPositive()
  readonly quantity: number;
}
