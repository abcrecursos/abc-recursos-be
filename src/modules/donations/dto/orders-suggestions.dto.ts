import { IsLatitude, IsLongitude, Validate } from 'class-validator';
import { SupplyExists } from '../../supplies';
import { DonationsValidationConstants } from
'../../../constants/validation/donation-validation-constants';

export class OrdersSuggestionsDto {

  @Validate(SupplyExists)
	supplyId: string;

  @IsLongitude({message: DonationsValidationConstants.LongitudeHasToBeValid})
	longitude: number;

  @IsLatitude({message: DonationsValidationConstants.LatitudeHasToBeValid})
	latitude: number;
}
