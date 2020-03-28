import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuppliesModule } from './modules/supplies/supplies.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { LocationsModule } from './modules/locations/locations.module';
import { HealthCentersModule } from './modules/health-centers/health-centers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const {
          protocol,
          name,
          host,
          port,
          user,
          password,
          options,
        } = configService.get<any>('database');

        return {
          uri: `${protocol}://${user}:${password}@${host}/${name}?${options}`,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        };
      },
      inject: [ConfigService],
    }),
    SuppliesModule,
    ProvidersModule,
    LocationsModule,
    HealthCentersModule,
  ],
})
export class AppModule {}
