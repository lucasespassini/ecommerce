import { Permissao } from '@prisma/client';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CadastroDto {
  @IsEmail({}, { message: '$property inválido' })
  email: string;

  @IsString({ message: '$property inválido' })
  nome: string;

  @IsString({ message: '$property inválida' })
  @MinLength(5, { message: '$property deve ter pelo menos 5 caracteres' })
  senha: string;

  @IsIn(['CLIENTE', 'VENDEDOR'])
  permissao: Permissao;

  @IsOptional()
  @IsString({ message: '$property inválida' })
  vendedor_nome: string;
}
