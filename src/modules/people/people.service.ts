import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from './interfaces/person';
//import { UserExistsException } from './exceptions/user-exists.exception';
import { CreatePersonDto } from './dto/create-person.dto';
//import { PersonOutDto } from './dto/person-out.dto';


@Injectable()
export class PeopleService {

  constructor(@InjectModel('Person') private personModel: Model<Person>) {}

  async findById(id: string): Promise<Person> {

  	return this.personModel.findById(id).exec();
  }

  async create(
    createPersonDto: CreatePersonDto,
  ): Promise<Person> {

    const address = {
      street: createPersonDto.address.street,
      number: createPersonDto.address.number,
      postalCode: createPersonDto.address.postalCode,
      localidad: createPersonDto.address.localidad,
      departamento: createPersonDto.address.departamento,
      province: createPersonDto.address.province,
      geoLocation: {
        type: 'point',
        coordinates: [
          createPersonDto.address.longitude,
          createPersonDto.address.latitude
        ]
      }
    };

    const phone = {
      type: createPersonDto.phone.type,
      prefix: createPersonDto.phone.prefix,
      number: createPersonDto.phone.number
    };

    const createdPerson = new this.personModel({
      name : createPersonDto.name,
      lastname: createPersonDto.lastname,
      email: createPersonDto.email,
      address: address,
      phone: phone
    });

    return createdPerson.save();
  }

  async exists(id: string): Promise<boolean> {
  	return await this.findById(id) != null;
  }
}
