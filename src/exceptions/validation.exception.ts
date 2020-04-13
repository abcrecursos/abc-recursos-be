import { ValidationError, UnprocessableEntityException } from '@nestjs/common';

/**
Represents an exception with validation errors.

This Exception extends from UnprocessableEntityException.
*/
export class ValidationException extends UnprocessableEntityException {

	constructor(errors: ValidationError[]) {
		super(errors.map(function(current) {

			return {
				property: current.property,
				errors: current.constraints
			};
		}))
	}
}