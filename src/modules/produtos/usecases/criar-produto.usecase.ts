import { BadRequestException, Inject } from '@nestjs/common';
import { Payload } from 'src/interfaces/payload.interface';
import { Usecase } from 'src/interfaces/usecase.interface';
import { CriarProdutoDto } from '../dto/criar-produto.dto';
import { ProdutoEntity } from '../entities/produto.entity';
import { ProdutoRepository } from '../repositories/produto.repository';

type CriarProdutoUsecaseInput = {
  payload: Payload;
  criarProdutoDto: CriarProdutoDto;
};

export class CriarProdutoUsecase
  implements Usecase<CriarProdutoUsecaseInput, void>
{
  constructor(
    @Inject(ProdutoRepository)
    private readonly produtoRepository: ProdutoRepository,
  ) {}

  async execute({
    payload,
    criarProdutoDto,
  }: CriarProdutoUsecaseInput): Promise<void> {
    const produtoEntity = ProdutoEntity.create({
      nome: criarProdutoDto.nome,
      valor: criarProdutoDto.valor,
      estoque: criarProdutoDto.estoque || 0,
      vendedor: {
        id: payload.vendedor?.id || '',
        nome: payload.vendedor?.nome || '',
      },
    });

    if (produtoEntity.isLeft())
      throw new BadRequestException(produtoEntity.value);

    await this.produtoRepository.criar(produtoEntity.value);
  }
}
