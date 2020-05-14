import { ValidateNested, MinLength, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

import { PhoneDto } from "./";
import { AddressDto } from './';

import { PeopleValidationConstants } from '../../../constants/validation';

export class CreatePersonDto {

  @MinLength(2, { message: PeopleValidationConstants.NameMinLength })
	readonly name: string;

  @MinLength(2, { message: PeopleValidationConstants.LastnameMinLength })
	readonly lastname: string;

  @IsEmail({}, { message: PeopleValidationConstants.ValidEmail })
	readonly email: string;

  @ValidateNested()
  @Type(() => AddressDto)
	readonly address: AddressDto;

  @ValidateNested()
  @Type(() => PhoneDto)
	readonly phone: PhoneDto;
}
