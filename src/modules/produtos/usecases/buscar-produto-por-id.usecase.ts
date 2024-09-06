import { Inject, NotFoundException } from '@nestjs/common';
import { Usecase } from 'src/interfaces/usecase.interface';
import { ProdutoEntity } from '../entities/produto.entity';
import { ProdutoRepository } from '../repositories/produto.repository';

type BuscarProdutoPorIdUsecaseInput = { produto_id: string };
type BuscarProdutoPorIdUsecaseOutput = ProdutoEntity;

export class BuscarProdutoPorIdUsecase
  implements
    Usecase<BuscarProdutoPorIdUsecaseInput, BuscarProdutoPorIdUsecaseOutput>
{
  constructor(
    @Inject(ProdutoRepository)
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  async execute({
    produto_id,
  }: BuscarProdutoPorIdUsecaseInput): Promise<BuscarProdutoPorIdUsecaseOutput> {
    const produtoEntity = await this.produtoRepository.buscarPorId(produto_id);

    if (produtoEntity.isLeft())
      throw new NotFoundException(['produto não encontrado']);

    return produtoEntity.value;
  }
}
