import { Module } from '@nestjs/common';
import { HealthCentersController } from './health-centers.controller';
import { HealthCentersService } from './health-centers.service';
import { MongooseModule } from '@nestjs/mongoose';
import HealthCenterSchema from '../../database/schemas/healthCenter.schema';
import HealthCenterCategorySchema from '../../database/schemas/healthCenterCategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HealthCenter', schema: HealthCenterSchema },
      { name: 'HealthCenterCategory', schema: HealthCenterCategorySchema },
    ]),
  ],
  controllers: [HealthCentersController],
  providers: [HealthCentersService],
})
export class HealthCentersModule {}
