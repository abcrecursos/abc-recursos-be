import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackingNumberGeneratorService {

  /**
  Generates a unique tracking number. This number is a combination
  of current date and an Object id.

  @param objectId - ID to use as reference to create the tracking number.

  @returns a unique tracking number.
  */
  public generateFromObjectId(objectId: string): string {

    let today: Date = new Date();

    //YYYYMMDD
    let ret: string =
      today.getFullYear().toString()
     + today.getMonth().toString().padStart(2, '0')
     + today.getDay().toString().padStart(2, '0');

    if (objectId.length > 4) {
      ret += objectId.substring(objectId.length - 5);
    } else {
      ret += "0".repeat(4 - objectId.length) + objectId;
    }

    return ret;
  }
}