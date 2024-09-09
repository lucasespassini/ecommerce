import { Inject } from '@nestjs/common';
import { Payload } from 'src/interfaces/payload.interface';
import { Usecase } from 'src/interfaces/usecase.interface';
import { BuscarProdutoPorIdUsecase } from 'src/modules/produtos/usecases/buscar-produto-por-id.usecase';
import { AdicionarProdutoCarrinhoDto } from '../dto/adicionar-produto-carrinho.dto';
import { CarrinhoRepository } from '../repositories/carrinho.repository';

type AdicionarProdutoAoCarrinhoUsecaseInput = {
  payload: Payload;
  adicionarProdutoCarrinhoDto: AdicionarProdutoCarrinhoDto;
};

export class AdicionarProdutoAoCarrinhoUsecase
  implements Usecase<AdicionarProdutoAoCarrinhoUsecaseInput, void>
{
  constructor(
    @Inject(CarrinhoRepository)
    private readonly carrinhoRepository: CarrinhoRepository,
    private readonly buscarProdutoPorIdUsecase: BuscarProdutoPorIdUsecase,
  ) {}

  async execute({
    payload,
    adicionarProdutoCarrinhoDto,
  }: AdicionarProdutoAoCarrinhoUsecaseInput): Promise<void> {
    const produtoEntity = await this.buscarProdutoPorIdUsecase.execute({
      produto_id: adicionarProdutoCarrinhoDto.produto_id,
    });

    await this.carrinhoRepository.adicionarAoCarrinho(
      payload.id,
      adicionarProdutoCarrinhoDto.quantidade,
      produtoEntity,
    );
  }
}
