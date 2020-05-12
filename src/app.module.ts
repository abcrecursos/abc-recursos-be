import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuppliesModule } from './modules/supplies/supplies.module';
import { LocationsModule } from './modules/locations/locations.module';
import { HealthCentersModule } from './modules/health-centers/health-centers.module';
import { ProducersModule } from './modules/producers/producers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './modules/orders/orders.module';
import { DonationsModule } from './modules/donations/donations.module';
import { CommonModule } from './modules/common/common.module';


import { AuthModule } from './modules/auth/auth.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: '.env',
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
          // port,
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
    DonationsModule,
    SuppliesModule,
    LocationsModule,
    HealthCentersModule,
    OrdersModule,
    ProducersModule,
    AuthModule,
    CommonModule
    ],
})
export class AppModule {}
