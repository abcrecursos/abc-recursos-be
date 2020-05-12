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

  async create(data: CreatePersonDto, userId: string = null): Promise<Person> {

    const address = {
      street: data.address.street,
      number: data.address.number,
      postalCode: data.address.postalCode,
      location: data.address.location,
      province: data.address.province,
      geoLocation: {
        coordinates: [data.address.geoLocation.longitude, data.address.geoLocation.latitude],
        type: 'point'
      }
    };

    const phone = {
      type: data.phone.type,
      prefix: data.phone.prefix,
      number: data.phone.number
    }


    const createdPerson = new this.personModel({
      name: data.name,
      lastname: data.lastname,
      address: address,
      phone: phone,
      user_id: userId,
      email: data.email
    });
    
    return createdPerson.save();
  }

  async exists(id: string): Promise<boolean> {
  	return await this.findById(id) != null;
  }
}
