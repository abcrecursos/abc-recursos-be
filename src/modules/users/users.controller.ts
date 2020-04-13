import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserExistsException } from './exceptions/user-exists.exception';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

	@Post()
	create(@Body() data: CreateUserDto) {
		return this.usersService.create(data);
	}
}
