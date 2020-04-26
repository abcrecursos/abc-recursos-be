import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import PersonSchema from '../../database/schemas/person.schema';
import { PeopleExists } from './validation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Person', schema: PersonSchema }
    ]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService, PeopleExists],
  exports: [PeopleService, PeopleExists]
})
export class PeopleModule {}
