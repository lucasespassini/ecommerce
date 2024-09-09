import { Inject } from '@nestjs/common';
import { Payload } from 'src/interfaces/payload.interface';
import { Usecase } from 'src/interfaces/usecase.interface';
import { ComprarCarrinhoDto } from '../dto/comprar-carrinho.dto';
import { CarrinhoRepository } from '../repositories/carrinho.repository';

type ComprarCarrinhoUsecaseInput = {
  payload: Payload;
  comprarCarrinhoDto: ComprarCarrinhoDto;
};

export class ComprarCarrinhoUsecase
  implements Usecase<ComprarCarrinhoUsecaseInput, void>
{
  constructor(
    @Inject(CarrinhoRepository)
    private readonly carrinhoRepository: CarrinhoRepository,
  ) {}

  async execute({
    payload,
    comprarCarrinhoDto,
  }: ComprarCarrinhoUsecaseInput): Promise<void> {
    // await this.carrinhoRepository.comprarProdutos(
    //   payload.id,
    //   comprarCarrinhoDto.,
    // );
  }
}
