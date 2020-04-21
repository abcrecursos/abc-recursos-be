import { DonationItemDto } from './donation-item.dto';
import { ArrayMinSize , ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { HealthCenterExists } from '../../health-centers';

export class CreateDonationDto {

	@Validate(HealthCenterExists)
  readonly healthCenter_id: String;

  //TODO definir mensajes de error

  //https://stackoverflow.com/questions/58343262/class-validator-validate-array-of-objects
  @ArrayMinSize(1, { message: "Al menos un insumo es requerido." })
  @ValidateNested({ each: true })
  @Type(() => DonationItemDto)
  readonly items: DonationItemDto[];
}
