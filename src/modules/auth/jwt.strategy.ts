import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users//users.service';

/**
Provides a jwt strategy for using with a
passport authentication
*/
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<any> {
    console.log(payload);
    let username: string = payload.username;
    let id: any = payload.id;

    //checks if username and id are set.
    if (!username || !id) {
      return null;
    }

    //Checks if user exists by username
    let userExists = await this.usersService.checkIfUserExists(username);

    if (!userExists) {
      return null;
    }

    //Get user from service
    let ret = await this.usersService.findById(id);

    //Verify is username provided is equals to fetched.
    if (ret.username != username) {
      return null;
    }

    //Returns a valid user or null if does not exists
    return ret;
    //TODO verificar que el token no haya sido revocado anteriormente
  }
}
