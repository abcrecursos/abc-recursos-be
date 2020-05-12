import { Module } from '@nestjs/common';
import { TrackingNumberGeneratorService } from './tracking-number-generator.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ TrackingNumberGeneratorService ],
  exports: [ TrackingNumberGeneratorService ]
})
export class CommonModule {}