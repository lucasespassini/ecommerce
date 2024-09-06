import { Validate } from 'class-validator';
import { IsULID } from 'src/utils/validateULID';

export class AdicionarProdutoCarrinhoDto {
  @Validate(IsULID)
  produto_id: string;
}
