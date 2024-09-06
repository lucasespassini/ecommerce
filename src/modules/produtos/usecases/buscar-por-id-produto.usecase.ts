import { Inject, NotFoundException } from '@nestjs/common';
import { Usecase } from 'src/interfaces/usecase.interface';
import { ProdutoEntity } from '../entities/produto.entity';
import { ProdutoRepository } from '../repositories/produto.repository';

type BuscarPorIdProdutoUsecaseInput = { produto_id: string };
type BuscarPorIdProdutoUsecaseOutput = ProdutoEntity;

export class BuscarPorIdProdutoUsecase
  implements
    Usecase<BuscarPorIdProdutoUsecaseInput, BuscarPorIdProdutoUsecaseOutput>
{
  constructor(
    @Inject(ProdutoRepository)
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  async execute({
    produto_id,
  }: BuscarPorIdProdutoUsecaseInput): Promise<BuscarPorIdProdutoUsecaseOutput> {
    const produtoEntity = await this.produtoRepository.buscarPorId(produto_id);

    if (produtoEntity.isLeft())
      throw new NotFoundException(['produto não encontrado']);

    return produtoEntity.value;
  }
}
