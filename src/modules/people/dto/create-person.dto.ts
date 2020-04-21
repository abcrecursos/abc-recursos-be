//import { UserValidationConstants } from '../../../constants/validation/user-validation-constants';
import { Address } from "../../locations/interfaces/address.interface";
import { Phone } from "../../phones/interfaces/phone.interface";


export class CreatePersonDto {

	readonly name: string;
	readonly lastname: string;
	readonly email: string;

	readonly address: Address;
	readonly phone: Phone;
	readonly userId: string;
	// readonly username: string;



}
