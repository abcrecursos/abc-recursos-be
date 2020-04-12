import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user';
import { UserExistsException } from './exceptions/user-exists.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UserOutDto } from './dto/user-out.dto';
var bcryptjs = require('bcryptjs');

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {

  }

  private hashPassword(password: string, salt: string): string {

  	return bcryptjs.hashSync(password, salt);
  }

  /**
  Checks if user exists by username.

  username Username to check if exists.

  Returns true if user with given username exists,
  false otherwise.
  */
  async checkIfUserExists(username: string): Promise<boolean> {

  	return await this.findByUsername(username) != null;
  }

  /**
  Find a user by it's username.

  username User username.

  Returns found user, null if it does not exists.
  */
  private async findByUsername(username: string): Promise<User> {

  	return await this.userModel.findOne({username: username}).exec();
  }

  /**
  Validates user credentials.

  username 	User username
  password	User password.

  Returns a User model if credentials are valid, null otherwise.
  */
  async validate(username: string, password: string): Promise<UserOutDto> {

  	if (!this.checkIfUserExists(username)) {
  		return null;
  	}

  	//Find user by username
  	let doc: User = await this.findByUsername(username);

  	//Check if returns something
  	if (doc == null) {
  		return null;
  	}

		let registeredPassword = doc.password;
		let salt = doc.salt;

		let hashedPassword = this.hashPassword(password, salt);  	

		//Check if password match
		if (registeredPassword != hashedPassword) {
			return null;
		}

		//Username and password are correct
		return new UserOutDto(doc.id, doc.username);
  }

  

  /**
  Finds a User by its id.

  id ID to search for.

  Returns a User that matchs the provided ID, null if it does not exists.
  */
  async findById(id: string): Promise<UserOutDto> {

  	let doc: User = await this.userModel.findById(id);

  	return doc == null ? null : new UserOutDto(doc.id, doc.username);
  }

  /**
  Registers a new User.

  username User username.
  password User password.

  Returns the registered user.

  throws
  	UserNotFoundException if an user with the same username
  	already exists.
  */
  async create(userDto: CreateUserDto): Promise<UserOutDto> {

  	let userExists: boolean = await this.checkIfUserExists(userDto.username);

  	if (userExists) {
  		throw new UserExistsException();
  	}

  	let username = userDto.username;
  	let password = userDto.password;
  	let salt = bcryptjs.genSaltSync(10);
  	
  	//password hash
  	password = this.hashPassword(password, salt);

  	let doc = new this.userModel({username: username, password: password, salt: salt});
  	doc.save();

  	return new UserOutDto(doc.id, doc.username);
  }
}
