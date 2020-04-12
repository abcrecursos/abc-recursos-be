import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants/authConstants';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [
  	UsersModule,
  	PassportModule,
  	JwtModule.register({
      secret: jwtConstants.SECRET,
      signOptions: { expiresIn: '3600s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard]
})
export class AuthModule {}
