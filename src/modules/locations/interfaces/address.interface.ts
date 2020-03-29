import { GeoLocation } from './geoLocation.interface';

export interface Address {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  province: string;
  geoLocation: GeoLocation;
}
