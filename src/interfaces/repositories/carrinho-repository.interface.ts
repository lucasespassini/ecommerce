import { ProdutoEntity } from 'src/modules/produtos/entities/produto.entity';

export interface ICarrinhoRepository {
  adicionarAoCarrinho(
    usuario_id: string,
    produtoEntity: ProdutoEntity,
  ): Promise<void>;
}
