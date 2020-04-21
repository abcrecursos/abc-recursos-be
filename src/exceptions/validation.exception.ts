import { ValidationError, UnprocessableEntityException } from '@nestjs/common';

type PropertyError = {
	property: string,
	errors: any[],
	children?: PropertyError[]
};

/**
Represents an exception with validation errors.

This Exception extends from UnprocessableEntityException.
*/
export class ValidationException extends UnprocessableEntityException {

	constructor(errors: ValidationError[]) {
		super(errors.map(function(current) {

			return {
				property: current.property,
				errors: current.constraints,
				children: ValidationException.getErrorsFromChildren(current.children)
			};
		}))
	}

	private static getErrorsFromChildren(children): PropertyError[] {

		let ret: PropertyError[] = [];

		ret = children.map(function(current) {

			let retPropertyError: PropertyError = {
				property: current.property,
				errors: current.constraints
			};

			if (!!current.children) {
				retPropertyError.children = ValidationException.getErrorsFromChildren(current.children);
			}

			return retPropertyError;
		});

		return ret;
	}
}