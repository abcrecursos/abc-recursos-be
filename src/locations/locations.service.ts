import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class LocationsService {
  constructor(public http: HttpService) {}

  async findAllProvinces() {
    console.log(process.env.DB_PASSWORD);
    return this.http.get(
      `${process.env.LOCATIONS_URL}/7.2/download/provincias.json`,
    ).pipe(map((response: any) => response.provincias));
  }

  async findAllDepartments() {
    return this.http.get(
      `${process.env.LOCATIONS_URL}/7.3/download/departamentos.json`,
    ).pipe(map((response: any) => response.departamentos));
  }
}
