import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { z } from 'zod';

@ValidatorConstraint({ name: 'IsULID', async: false })
export class IsULID implements ValidatorConstraintInterface {
  validate(value: string): Promise<boolean> | boolean {
    const { success } = z.string().ulid().safeParse(value);
    return success;
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments?.property} inválido`;
  }
}
