import { ProdutoDto } from 'src/modules/carrinho/dto/comprar-carrinho.dto';
import { CarrinhoEntity } from 'src/modules/carrinho/entities/carrinho.entity';
import { ProdutoEntity } from 'src/modules/produtos/entities/produto.entity';

export interface ICarrinhoRepository {
  adicionarAoCarrinho(
    usuario_id: string,
    quantidade: number,
    produtoEntity: ProdutoEntity,
  ): Promise<void>;
  buscarCarrinho(usuario_id: string): Promise<CarrinhoEntity>;
  comprarProdutos(usuario_id: string, produtosDto: ProdutoDto[]): Promise<void>;
}
