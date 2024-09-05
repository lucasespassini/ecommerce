import { Module } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutoRepository } from './repositories/produto.repository';
import { CriarProdutoUsecase } from './usecases/criar-produto.usecase';

@Module({
  controllers: [ProdutosController],
  providers: [CriarProdutoUsecase, ProdutoRepository],
})
export class ProdutosModule {}
