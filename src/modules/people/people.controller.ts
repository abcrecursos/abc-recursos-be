import { Controller, Post, Body } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import {PeopleService } from './people.service';
//import { PersonExistsException } from './exceptions/user-exists.exception';

@Controller('people')
export class PeopleController {

  constructor(private peopleService: PeopleService) {}

	@Post()
	create(@Body() data: CreatePersonDto) {
		return this.peopleService.create(data);
	}
}
