import { Module } from '@nestjs/common';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { PeopleService } from '../people/people.service';
import { UsersService } from '../users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import ProducerSchema from '../../database/schemas/producer.schema';
import PersonSchema from '../../database/schemas/person.schema';
import UserSchema from '../../database/schemas/user.schema';
import ProducerCategorySchema from '../../database/schemas/producerCategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Producer', schema: ProducerSchema },
      { name: 'ProducerCategory', schema: ProducerCategorySchema },
      { name: 'Person', schema: PersonSchema },
        { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ProducersController],
  providers: [ProducersService, PeopleService, UsersService],
})
export class ProducersModule {}
