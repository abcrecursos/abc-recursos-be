import { ValidatorConstraint, ValidatorConstraintInterface, Validator, IsNotEmpty, IsMongoId } from 'class-validator';
import { HealthCentersService } from '../health-centers.service';
import { Injectable } from '@nestjs/common';
import { HealthCentersValidationConstants } from '../../../constants/validation/heath-centers-validation-constants';

/**
 Verifies that a HealthCenter exists based on the ID.
*/
@ValidatorConstraint({ name: 'HealthCenterExists', async: true })
@Injectable()
export class HealthCenterExists implements ValidatorConstraintInterface {
  constructor(protected readonly healthCenterService: HealthCentersService) {}

  async validate(id: string) {

  	let validator = new Validator();

  	if (!validator.isNotEmpty(id) || ! validator.isMongoId(id)) {
  		return false;
  	}

    return this.healthCenterService.exists(id);
  }

  defaultMessage() {
    return HealthCentersValidationConstants.HealthCenterMustExists;
  }
}