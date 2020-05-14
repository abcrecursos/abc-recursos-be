import { GeoLocation } from './geoLocation.interface';

export interface Address {
  street: string;
  number: string;
  postalCode: string;
  location: string;
  province: string;
  geoLocation: GeoLocation;
}
