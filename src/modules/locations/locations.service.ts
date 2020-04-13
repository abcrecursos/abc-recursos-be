import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocationsService {
  geoRefApi: string;
  constructor(private http: HttpService, private configSrv: ConfigService) {
    this.geoRefApi = this.configSrv.get<string>('externalApis.gobArGeoRef');
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

  //async findAllCitiesByDepartmentId(id: string) {
    //return this.http
      //.get(
      //  `${this.geoRefApi}ciudades?campos=nombre,centroide.lat,centroide.lon,ciudad.id,ciudad.nombre&ciudad=${id}`,
      //)
      //.pipe(map((response: any) => response.data.ciudades));
  //}
  async findAllLocalitiesByDepartmentId(id: string) {
    return this.http
      .get(
        `${this.geoRefApi}localidades?campos=nombre,centroide.lat,centroide.lon,localidad_censal.id,localidad_censal.nombre&departamento=${id}&max=5000`,
      )
      .pipe(map((response: any) => response.data.localidades));
  }


}
