import { Module } from '@nestjs/common';
import { ProdutosModule } from '../produtos/produtos.module';
import { CarrinhoController } from './carrinho.controller';
import { CarrinhoRepository } from './repositories/carrinho.repository';
import { AdicionarProdutoAoCarrinhoUsecase } from './usecases/adicionar-produto-carrinho.usecase';
import { BuscarCarrinhoUsecase } from './usecases/buscar-carrinho.usecase';
import { ComprarCarrinhoUsecase } from './usecases/comprar-carrinho.usecase';

@Module({
  imports: [ProdutosModule],
  controllers: [CarrinhoController],
  providers: [
    BuscarCarrinhoUsecase,
    AdicionarProdutoAoCarrinhoUsecase,
    ComprarCarrinhoUsecase,
    CarrinhoRepository,
  ],
})
export class CarrinhoModule {}
