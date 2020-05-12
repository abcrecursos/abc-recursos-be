import { IsLatitude, IsLongitude } from 'class-validator';

export class GeoLocationDto {

  //TODO colocar el mensaje de error a retornar
  @IsLatitude()
  latitude: number;

  //TODO colocar el mensaje de error a retornar
  @IsLongitude()
  longitude: number;
}