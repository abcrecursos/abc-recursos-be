import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organizations } from './interfaces/Organizations';
import { Model } from 'mongoose';
import { CreateOrganizationsDto } from './dto/create-organizations.dto';
//import { GetOrganizationDto } from './dto/getOrganizations.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel('Organization') private organization: Model<Organizations>,
  ) {}

  // async findAll(): Promise<GetOrganizationDto[]> {
  //   return this.organization.find().exec();
  // }

  async create(
    createOrganizationDto: CreateOrganizationsDto,
  ): Promise<Organizations> {

      const validationNumber = await this.organization.exists({ "phone.number" : createOrganizationDto.phone.number })
      const validationName = await this.organization.exists({ "name" : createOrganizationDto.name })

      //Validation if exists in health-centers
      if(validationNumber || validationName) {

        //TODO return exception error "bad request 400"
        //A debatir: Se puede consultar desde el front si el registro corresponde a la entidad encontrada en la base health-centers

      } else {

        const createdSupply = new this.organization(createOrganizationDto);
        return createdSupply.save();

      }
  }

}
