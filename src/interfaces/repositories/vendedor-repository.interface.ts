import { VendedorEntity } from 'src/modules/vendedores/entities/vendedor.entity';
import { Either } from 'src/utils/either';

export interface IVendedorRepository {
  buscarPorId(vendedor_id: string): Promise<Either<null, VendedorEntity>>;
}
