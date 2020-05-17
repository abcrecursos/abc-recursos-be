import { MinLength, Min, IsLatitude, IsLongitude, IsOptional } from 'class-validator';
import { AddressValidationConstants } from '../../../constants/validation';

export class AddressDto {

  @MinLength(2, { message: AddressValidationConstants.StreetMinLength })
  street: string;

  @Min(1, { message: AddressValidationConstants.StreetNumberMinValue })
  number: number;

  @Min(1, { message: AddressValidationConstants.PostalCodeMinValue })
  postalCode: number;

  @MinLength(2, { message: AddressValidationConstants.LocationMinLength })
  location: string;

  @MinLength(2, { message: AddressValidationConstants.ProvinceMinLength })
  province: string;

  @IsOptional()
  departamento: string;


//Cambiar esto cuando incluya georeferenciacion de la persona
  //@IsLatitude({ message: AddressValidationConstants.LatitudeMustBeValid })
  @IsOptional()
  latitude: number;

//  @IsLongitude({ message: AddressValidationConstants.LongitudeMustBeValid })
  @IsOptional()
  longitude: number;
}
