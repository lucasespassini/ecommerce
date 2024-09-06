import { ProdutoEntity } from 'src/modules/produtos/entities/produto.entity';
import { Either } from 'src/utils/either';

export interface IProdutoRepository {
  criar(produtoEntity: ProdutoEntity): Promise<void>;
  buscarPorId(produto_id: string): Promise<Either<null, ProdutoEntity>>;
}
