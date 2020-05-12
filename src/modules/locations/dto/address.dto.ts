import { Min, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GeoLocationDto } from './geolocation.dto';

export class AddressDto {

  //TODO colocar mensaje de error como constante para cada propiedad

  @MinLength(2)
  street: string;

  @Min(1)
  number: number;

  @MinLength(2)
  postalCode: string;

  @MinLength(2)
  location: string;

  @MinLength(2)
  province: string;

  @ValidateNested()
  @Type(() => GeoLocationDto)
  geoLocation: GeoLocationDto;
}