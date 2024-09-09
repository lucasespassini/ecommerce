import { IsNumber, IsPositive, Max } from 'class-validator';

export class DepositoUsuarioDto {
  @IsPositive({ message: '$property deve ser positivo' })
  @IsNumber(
    { maxDecimalPlaces: 2, allowInfinity: false, allowNaN: false },
    { message: '$property inválido' },
  )
  @Max(1000, { message: 'valor máximo de depósito é R$1000,00' })
  valor_deposito: number;
}
