import { IsPositive, Validate } from 'class-validator';
import { SupplyExists } from '../../supplies';
import { DonationsValidationConstants } from '../../../constants/validation/donation-validation-constants';

export class DonationItemDto {
	
	/**
	Supply ID donated.
	*/
  @Validate(SupplyExists)
  readonly supply_id: string;

  /**
  Quantity donated.
  */
  @IsPositive({message: DonationsValidationConstants.SupplyQuantityPositive})
  readonly quantity: number;
}
