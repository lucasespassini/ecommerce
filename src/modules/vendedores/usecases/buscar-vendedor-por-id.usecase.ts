import { Inject, NotFoundException } from '@nestjs/common';
import { Usecase } from 'src/interfaces/usecase.interface';
import { VendedorEntity } from '../entities/vendedor.entity';
import { VendedorRepository } from '../repositories/vendedor.repository';

type BuscarVendedorPorIdUsecaseInput = { vendedor_id: string };
type BuscarVendedorPorIdUsecaseOutput = VendedorEntity;

export class BuscarVendedorPorIdUsecase
  implements
    Usecase<BuscarVendedorPorIdUsecaseInput, BuscarVendedorPorIdUsecaseOutput>
{
  constructor(
    @Inject(VendedorRepository)
    private readonly vendedorRepository: VendedorRepository,
  ) {}

  async execute({
    vendedor_id,
  }: BuscarVendedorPorIdUsecaseInput): Promise<BuscarVendedorPorIdUsecaseOutput> {
    const vendedorEntity =
      await this.vendedorRepository.buscarPorId(vendedor_id);

    if (vendedorEntity.isLeft())
      throw new NotFoundException(['vendedor não encontrado']);

    return vendedorEntity.value;
  }
}
