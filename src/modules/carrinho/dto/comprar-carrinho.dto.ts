import { ArrayNotEmpty, IsArray, Max, Min, Validate } from 'class-validator';
import { IsULID } from 'src/utils/validateULID';

export class ProdutoDto {
  @Validate(IsULID)
  produto_id: string;

  @Min(1)
  @Max(10)
  quantidade: number;
}

export class ComprarCarrinhoDto {
  @IsArray()
  @ArrayNotEmpty()
  produtos: ProdutoDto[];
}
