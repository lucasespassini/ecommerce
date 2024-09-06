import { Injectable } from '@nestjs/common';
import { IVendedorRepository } from 'src/interfaces/repositories/vendedor-repository.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Either, left, right } from 'src/utils/either';
import { VendedorEntity } from '../entities/vendedor.entity';

@Injectable()
export class VendedorRepository implements IVendedorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorId(
    vendedor_id: string,
  ): Promise<Either<null, VendedorEntity>> {
    const vendedorDb = await this.prisma.vendedor.findUnique({
      where: { vdd_id: vendedor_id },
    });

    if (!vendedorDb) return left(null);

    const vendedorEntity = VendedorEntity.with({
      id: vendedorDb.vdd_id,
      nome: vendedorDb.vdd_nome,
    });

    return right(vendedorEntity);
  }
}
