import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: '$property inválido' })
  email: string;

  @IsString({ message: '$property inválida' })
  @MinLength(5, { message: '$property deve ter pelo menos 5 caracteres' })
  senha: string;
}
