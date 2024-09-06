import { Module } from '@nestjs/common';
import { ProdutosModule } from '../produtos/produtos.module';
import { CarrinhoController } from './carrinho.controller';
import { CarrinhoRepository } from './repositories/carrinho.repository';
import { AdicionarProdutoAoCarrinhoUsecase } from './usecases/adicionar-produto-carrinho.usecase';

@Module({
  imports: [ProdutosModule],
  controllers: [CarrinhoController],
  providers: [AdicionarProdutoAoCarrinhoUsecase, CarrinhoRepository],
})
export class CarrinhoModule {}
