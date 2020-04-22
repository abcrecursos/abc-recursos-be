import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import PersonSchema from '../../database/schemas/person.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Person', schema: PersonSchema }
    ]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [PeopleService]
})
export class PeopleModule {}
