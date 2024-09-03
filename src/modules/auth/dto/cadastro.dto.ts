import { Permissao } from '@prisma/client';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CadastroDto {
  @IsEmail()
  email: string;

  @IsString()
  nome: string;

  @IsString()
  @MinLength(5)
  senha: string;

  @IsIn(['CLIENTE', 'VENDEDOR'])
  permissao: Permissao;

  @IsOptional()
  @IsString()
  vendedor_nome: string;
}
