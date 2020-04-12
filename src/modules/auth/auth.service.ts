import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {

  constructor(
  	private jwtService: JwtService,
  	private usersService: UsersService
  ) { }

	async validate(username: string, password: string) : Promise<any> {
		
		let userExists: boolean = await this.usersService.checkIfUserExists(username);

		if (!userExists) {
			return null;
		}

		return this.usersService.validate(username, password);
	}

	async login(user: any) {
		const payload = {username: user.username, id: user.id};
		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
