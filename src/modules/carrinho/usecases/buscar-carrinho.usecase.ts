import { Inject } from '@nestjs/common';
import { Payload } from 'src/interfaces/payload.interface';
import { Usecase } from 'src/interfaces/usecase.interface';
import { ProdutoEntity } from 'src/modules/produtos/entities/produto.entity';
import { CarrinhoEntity } from '../entities/carrinho.entity';
import { CarrinhoRepository } from '../repositories/carrinho.repository';

type BuscarCarrinhoUsecaseInput = { payload: Payload };
type BuscarCarrinhoUsecaseOutput = {
  id: string;
  valor_total: number;
  produtos: (ProdutoEntity & { quantidade: number })[];
};

export class BuscarCarrinhoUsecase
  implements Usecase<BuscarCarrinhoUsecaseInput, BuscarCarrinhoUsecaseOutput>
{
  constructor(
    @Inject(CarrinhoRepository)
    private readonly carrinhoRepository: CarrinhoRepository,
  ) {}

  async execute({
    payload,
  }: BuscarCarrinhoUsecaseInput): Promise<BuscarCarrinhoUsecaseOutput> {
    const carrinho = await this.carrinhoRepository.buscarCarrinho(payload.id);

    return this.presentOutput(carrinho);
  }

  private presentOutput(
    carrinhoEntity: CarrinhoEntity,
  ): BuscarCarrinhoUsecaseOutput {
    const produtos: (ProdutoEntity & { quantidade: number })[] = [];

    for (const produto of carrinhoEntity.produtos) {
      const produtoExistente = produtos.find((prd) => prd.id === produto.id);

      if (produtoExistente) {
        produtoExistente.quantidade += 1;
        continue;
      }

      produtos.push({
        id: produto.id,
        nome: produto.nome,
        valor: produto.valor,
        estoque: produto.estoque,
        quantidade: 1,
        vendedor: produto.vendedor,
      });
    }

    return {
      id: carrinhoEntity.id,
      valor_total: carrinhoEntity.valor_total,
      produtos,
    };
  }
}
