import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutoRepository } from './repositories/produto.repository';
import { BuscarPorIdProdutoUsecase } from './usecases/buscar-por-id-produto.usecase';
import { CriarProdutoUsecase } from './usecases/criar-produto.usecase';

@Module({
  controllers: [ProdutosController],
  providers: [
    CriarProdutoUsecase,
    BuscarPorIdProdutoUsecase,
    ProdutoRepository,
  ],
  exports: [BuscarPorIdProdutoUsecase],
})
export class ProdutosModule {}
