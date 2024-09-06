import { Inject } from '@nestjs/common';
import { Usecase } from 'src/interfaces/usecase.interface';
import { BuscarVendedorPorIdUsecase } from 'src/modules/vendedores/usecases/buscar-vendedor-por-id.usecase';
import { ProdutoEntity } from '../entities/produto.entity';
import { ProdutoRepository } from '../repositories/produto.repository';

type BuscarProdutosUsecaseInput = { vendedor_id?: string };
type BuscarProdutosUsecaseOutput = ProdutoEntity[];

export class BuscarProdutosUsecase
  implements Usecase<BuscarProdutosUsecaseInput, BuscarProdutosUsecaseOutput>
{
  constructor(
    @Inject(ProdutoRepository)
    private readonly produtoRepository: ProdutoRepository,
    private readonly buscarVendedorPorIdUsecase: BuscarVendedorPorIdUsecase,
  ) {}

  async execute({
    vendedor_id,
  }: BuscarProdutosUsecaseInput): Promise<BuscarProdutosUsecaseOutput> {
    if (vendedor_id)
      await this.buscarVendedorPorIdUsecase.execute({ vendedor_id });

    const produtos = await this.produtoRepository.buscarTodos(vendedor_id);

    return produtos;
  }
}
