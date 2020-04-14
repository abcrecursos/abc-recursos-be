import { MinLength, IsEmail, IsAlphanumeric } from 'class-validator'
import { UserValidationConstants } from '../../../constants/validation/user-validation-constants';

export class CreateUserDto {

	@IsEmail({}, {
		message: UserValidationConstants.usernameMustBeEmail
	})
	readonly username: string;

	@MinLength(4, {
		message: UserValidationConstants.passwordMinLength
	})
	@IsAlphanumeric("ar", {
		message: UserValidationConstants.passwordAlphanumeric
	})
	readonly password: string;
}