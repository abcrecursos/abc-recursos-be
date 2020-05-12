//import { UserValidationConstants } from '../../../constants/validation/user-validation-constants';
import { Address } from "../../locations/interfaces/address.interface";
import { Phone } from "../../phones/interfaces/phone.interface";
import { MinLength, IsEmail, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PeopleValidationConstants }
from '../../../constants/validation/people-validation-constants';

import { AddressDto, PhoneDto } from './';


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

  @IsOptional()
	readonly user_id?: string;
}
