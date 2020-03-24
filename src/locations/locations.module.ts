import { Module, HttpModule } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [HttpModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
