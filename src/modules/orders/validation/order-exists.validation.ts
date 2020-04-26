import { ValidatorConstraint, ValidatorConstraintInterface, Validator, IsNotEmpty, IsMongoId } from 'class-validator';
import { OrdersService } from '../orders.service';
import { Injectable } from '@nestjs/common';
import { OrdersValidationConstants } from '../../../constants/validation/orders-validation-constants';

/**
 Verifies that a HealthCenter exists based on the ID.
*/
@ValidatorConstraint({ name: 'OrderExists', async: true })
@Injectable()
export class OrderExists implements ValidatorConstraintInterface {
  constructor(protected readonly ordersService: OrdersService) {}

  async validate(id: string) {

  	let validator = new Validator();

  	if (!validator.isNotEmpty(id) || ! validator.isMongoId(id)) {
  		return false;
  	}

    return this.ordersService.exists(id);
  }

  defaultMessage() {
    return OrdersValidationConstants.OrderMustExists;
  }
}