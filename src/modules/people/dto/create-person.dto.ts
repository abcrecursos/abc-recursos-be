import { ValidateNested, MinLength, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

import { PhoneDto } from "../../phones";
import { AddressDto } from '../../locations';

export class CreatePersonDto {

  //TODO colocar mensaje de error como constante para cada propiedad

  @MinLength(2)
	readonly name: string;

  @MinLength(2)
	readonly lastname: string;

  @IsEmail()
	readonly email: string;

  @ValidateNested()
  @Type(() => AddressDto)
	readonly address: AddressDto;

  @ValidateNested()
  @Type(() => PhoneDto)
	readonly phone: PhoneDto;
}
