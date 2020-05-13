import { IsEnum, MinLength, IsIn } from 'class-validator';
import { PhoneTypes } from '../../../constants';
import { PhoneValidationConstants } from '../../../constants/validation';


export class PhoneDto {

  @IsIn(Object.keys(PhoneTypes), { message: PhoneValidationConstants.TypeInAllowedValues })
  type: PhoneTypes;

  @MinLength(2, { message: PhoneValidationConstants.PefixMinLength })
  prefix: string;

  @MinLength(6, { message: PhoneValidationConstants.NumberMinLength })
  number: string;
}