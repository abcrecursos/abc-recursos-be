import { DonationItemDto } from './donation-item.dto';
import { ArrayMinSize , ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { DonationsValidationConstants } from '../../../constants/validation/donation-validation-constants';
import { OrderExists } from '../../orders';
import { PeopleExists } from '../../people';

export class CreateDonationDto {

	@Validate(OrderExists)
  readonly order_id: String;

  @Validate(PeopleExists)
  readonly person_id: String;

  //https://stackoverflow.com/questions/58343262/class-validator-validate-array-of-objects
  @ArrayMinSize(1, { message: DonationsValidationConstants.AtLeastOneSupply })
  @ValidateNested({ each: true })
  @Type(() => DonationItemDto)
  readonly items: DonationItemDto[];
}
