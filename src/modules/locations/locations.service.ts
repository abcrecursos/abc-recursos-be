import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocationsService {
  geoRefApi: string;
  geoRefArcGisApi: string;

  constructor(private http: HttpService, private configSrv: ConfigService) {
    this.geoRefApi = this.configSrv.get<string>('externalApis.gobArGeoRef');
    this.geoRefArcGisApi = this.configSrv.get<string>('externalApis.arcGis');


  }

  async findAllProvinces() {
    return this.http
      .get(
        `${this.geoRefApi}provincias?campos=nombre,centroide.lat,centroide.lon&max=5000`,
      )
      .pipe(map(response => response.data.provincias));
  }

  async findAllDepartmentsByProvinceId(id: string) {
    return this.http
      .get(
        `${this.geoRefApi}departamentos?campos=nombre,centroide.lat,centroide.lon,provincia.id,provincia.nombre&provincia=${id}&max=5000`,
      )
      .pipe(map((response: any) => response.data.departamentos));
  }


  async findAllLocalitiesByDepartmentId(id: string) {
    return this.http
      .get(
        `${this.geoRefApi}localidades?campos=nombre,centroide.lat,centroide.lon,localidad_censal.id,localidad_censal.nombre&departamento=${id}&max=5000`,
      )
      .pipe(map((response: any) => response.data.localidades));
  }

  async findAllLocalitiesByProvinceId(id: string) {
    return this.http
      .get(
        `${this.geoRefApi}localidades?campos=nombre,centroide.lat,centroide.lon,localidad_censal.id,localidad_censal.nombre&provincia=${id}&max=5000`,
      )
      .pipe(map((response: any) => response.data.localidades));
  }

  //async geocodeAddress(direccion: string) {
  //  var that = this;

    //return new Promise(function(resolve, reject) {
      //that.http
      //.get(`${this.geoRefArcGisApi}findAddressCandidates?SingleLine=${direccion}&category=&outFields=*&countryCode=ARG&forStorage=false&f=pjson`,)
      //.subscribe(resolve, reject);
    //}.bind(this));

  async geocodeAddress(address: string) {
  //address debe pasar un string con el formato:  calle numero, partido, provincia
  // por ejemplo: Azcuenaga 1240, Vicente Lopez, Buenos Aires
  // Devuelve las coordenadas 

    const request=`${this.geoRefArcGisApi}findAddressCandidates?SingleLine=${address}&category=&outFields=*&countryCode=ARG&forStorage=false&f=pjson`;

    const myresponse= await this.http
      .get(`${this.geoRefArcGisApi}findAddressCandidates?SingleLine=${address}&category=&outFields=*&countryCode=ARG&forStorage=false&f=pjson`,)
      .pipe(map((response: any) => response.data.candidates[0].location));

    return myresponse
  }
}
