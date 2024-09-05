import { ProdutoEntity } from 'src/modules/produtos/entities/produto.entity';

export interface IProdutoRepository {
  criar(produtoEntity: ProdutoEntity): Promise<void>;
}
