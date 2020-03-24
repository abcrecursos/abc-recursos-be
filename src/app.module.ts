
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuppliesModule } from './supplies/supplies.module';
import { ProvidersModule } from './providers/providers.module';
import { LocationsModule } from './locations/locations.module';
import { HealthCentersModule } from './health-centers/health-centers.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://lthe-abcrecursos:9s7qZJnUE3qXhjE0@cluster0-ggsvj.mongodb.net/test?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    SuppliesModule,
    ProvidersModule,
    LocationsModule,
    HealthCentersModule,
  ],
})
export class AppModule {
}