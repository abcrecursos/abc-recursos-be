import { DonationItemDto } from './donation-item.dto';
import { ArrayMinSize , ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { DonationsValidationConstants } from '../../../constants/validation/donation-validation-constants';

import { OrderExists } from '../../orders';
import { PeopleExists, CreatePersonDto } from '../../people';

export class CreateDonationDto {

	@Validate(OrderExists)
  readonly orderId: string;

  @ValidateNested()
  readonly person: CreatePersonDto;

  //https://stackoverflow.com/questions/58343262/class-validator-validate-array-of-objects
  @ArrayMinSize(1, { message: DonationsValidationConstants.AtLeastOneSupply })
  @ValidateNested({ each: true })
  @Type(() => DonationItemDto)
  readonly items: DonationItemDto[];
}
