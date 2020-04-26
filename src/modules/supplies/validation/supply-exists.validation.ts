import { ValidatorConstraint, ValidatorConstraintInterface, Validator } from 'class-validator';
import { SuppliesService } from '../supplies.service';
import { Injectable } from '@nestjs/common';
import { SupplyValidationConstants } from '../../../constants/validation/supply-validation-constants';

/**
 Verifies that a Supply exists based on the ID.
*/
@ValidatorConstraint({ name: 'SupplyExists', async: true })
@Injectable()
export class SupplyExists implements ValidatorConstraintInterface {
  constructor(protected readonly suppliesService: SuppliesService) {}

  async validate(id: string) {

  	const validator = new Validator();

  	if (!validator.isNotEmpty(id) || !validator.isMongoId(id)) {
  		return false;
  	}

    return this.suppliesService.exists(id);
  }

  defaultMessage(): string {
    return SupplyValidationConstants.SupplyMustExists;
  }
}