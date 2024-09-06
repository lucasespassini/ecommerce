import { Inject } from '@nestjs/common';
import { Payload } from 'src/interfaces/payload.interface';
import { Usecase } from 'src/interfaces/usecase.interface';
import { BuscarPorIdProdutoUsecase } from 'src/modules/produtos/usecases/buscar-por-id-produto.usecase';
import { CarrinhoRepository } from '../repositories/carrinho.repository';

type AdicionarProdutoAoCarrinhoUsecaseInput = {
  payload: Payload;
  produto_id: string;
};

export class AdicionarProdutoAoCarrinhoUsecase
  implements Usecase<AdicionarProdutoAoCarrinhoUsecaseInput, void>
{
  constructor(
    @Inject(CarrinhoRepository)
    private readonly carrinhoRepository: CarrinhoRepository,
    private readonly buscarPorIdProdutoUsecase: BuscarPorIdProdutoUsecase,
  ) {}

  async execute({
    payload,
    produto_id,
  }: AdicionarProdutoAoCarrinhoUsecaseInput): Promise<void> {
    const produtoEntity = await this.buscarPorIdProdutoUsecase.execute({
      produto_id,
    });

    await this.carrinhoRepository.adicionarAoCarrinho(
      payload.id,
      produtoEntity,
    );
  }
}
