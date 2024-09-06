import { IsNumber, IsPositive } from 'class-validator';

export class DepositoUsuarioDto {
  @IsPositive({ message: '$property deve ser positivo' })
  @IsNumber(
    { maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false },
    { message: '$property inválido' },
  )
  valor_deposito: number;
}
