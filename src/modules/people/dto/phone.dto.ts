import { IsIn, MinLength } from 'class-validator';
import { PhoneTypes } from '../../../constants';
import { PhoneValidationConstants } from '../../../constants/validation';


export class PhoneDto {

  @IsIn([PhoneTypes.Cellphone, PhoneTypes.Phone], { message: PhoneValidationConstants.TypeInAllowedValues })
  type: string;

  @MinLength(2, { message: PhoneValidationConstants.PefixMinLength })
  prefix: string;

  @MinLength(6, { message: PhoneValidationConstants.NumberMinLength })
  number: string;
}