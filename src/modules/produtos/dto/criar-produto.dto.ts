import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  @Min(0, { message: '$property inválido' })
  valor: number;

  @IsOptional()
  @Min(0, { message: '$property inválido' })
  estoque?: number;
}
