import { MinLength, IsIn } from 'class-validator';
import { PhoneTypes } from '../../../constants/phoneTypes';

export class PhoneDto {

  //TODO colocar mensajes de error en constanstes y retornarlos

  @MinLength(2)
  readonly prefix: string;

  @MinLength(6)
  readonly number: string;

  @IsIn(['CellPhone', 'Phone'])
  readonly type: PhoneTypes;
}
