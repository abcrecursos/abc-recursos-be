import { ValidatorConstraint, ValidatorConstraintInterface, Validator, IsNotEmpty, IsMongoId } from 'class-validator';
import { PeopleService } from '../people.service';
import { Injectable } from '@nestjs/common';
import { PeopleValidationConstants } from '../../../constants/validation/people-validation-constants';

/**
 Verifies that a HealthCenter exists based on the ID.
*/
@ValidatorConstraint({ name: 'PeopleExists', async: true })
@Injectable()
export class PeopleExists implements ValidatorConstraintInterface {
  constructor(protected readonly peopleService: PeopleService) {}

  async validate(id: string) {

  	let validator = new Validator();

  	if (!validator.isNotEmpty(id) || ! validator.isMongoId(id)) {
  		return false;
  	}

    return this.peopleService.exists(id);
  }

  defaultMessage() {
    return PeopleValidationConstants.PeopleMustExists;
  }
}