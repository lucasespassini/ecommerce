import { IsOptional, Validate } from 'class-validator';
import { IsULID } from 'src/utils/validateULID';

export class BuscarProdutosQueryDto {
  @IsOptional()
  @Validate(IsULID)
  vendedor_id: string;
}
