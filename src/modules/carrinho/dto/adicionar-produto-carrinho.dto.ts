import { IsNumber, Max, Validate } from 'class-validator';
import { IsULID } from 'src/utils/validateULID';

export class AdicionarProdutoCarrinhoDto {
  @Validate(IsULID)
  produto_id: string;

  @Max(10)
  @IsNumber({ maxDecimalPlaces: 0 })
  quantidade: number;
}
