import { Module } from '@nestjs/common';
import { VendedorRepository } from './repositories/vendedor.repository';
import { BuscarVendedorPorIdUsecase } from './usecases/buscar-vendedor-por-id.usecase';

@Module({
  providers: [BuscarVendedorPorIdUsecase, VendedorRepository],
  exports: [BuscarVendedorPorIdUsecase],
})
export class VendedoresModule {}
