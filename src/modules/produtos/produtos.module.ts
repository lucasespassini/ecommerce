import { Module } from '@nestjs/common';
import { VendedoresModule } from '../vendedores/vendedores.module';
import { ProdutosController } from './produtos.controller';
import { ProdutoRepository } from './repositories/produto.repository';
import { BuscarProdutoPorIdUsecase } from './usecases/buscar-produto-por-id.usecase';
import { BuscarProdutosUsecase } from './usecases/buscar-produtos.usecase';
import { CriarProdutoUsecase } from './usecases/criar-produto.usecase';

@Module({
  imports: [VendedoresModule],
  controllers: [ProdutosController],
  providers: [
    CriarProdutoUsecase,
    BuscarProdutoPorIdUsecase,
    BuscarProdutosUsecase,
    ProdutoRepository,
  ],
  exports: [BuscarProdutoPorIdUsecase],
})
export class ProdutosModule {}
