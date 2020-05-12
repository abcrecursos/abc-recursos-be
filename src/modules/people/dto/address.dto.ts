import { MinLength, Min, IsLatitude, IsLongitude, IsOptional } from 'class-validator';
import { AddressValidationConstants } from '../../../constants/validation';

export class AddressDto {

  @MinLength(2, { message: AddressValidationConstants.StreetMinLength })
  street: string;

  @Min(1, { message: AddressValidationConstants.StreetNumberMinValue })
  number: number;

  @Min(1, { message: AddressValidationConstants.PostalCodeMinValue })
  postalCode: number;

  @MinLength(2, { message: AddressValidationConstants.CityMinLength })
  localidad: string;

  @MinLength(2, { message: AddressValidationConstants.ProvinceMinLength })
  province: string;

  @IsOptional()
  departamento: string;

  @IsLatitude({ message: AddressValidationConstants.LatitudMustBeValid })
  latitude: number;

  @IsLongitude({ message: AddressValidationConstants.LongitudeMustBeValid })
  longitude: number;
}