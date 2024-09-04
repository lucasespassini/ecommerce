import { Either, left, right } from 'src/utils/either';
import { validateSchema } from 'src/utils/validateSchema';
import { ulid } from 'ulid';
import { z } from 'zod';

export const vendedorEntitySchema = z.object({
  id: z.string().ulid('id inválido'),
  nome: z
    .string({ message: 'nome do vendedor inválido' })
    .min(3, { message: 'nome do vendedor inválido' }),
});

type VendedorEntityProps = z.infer<typeof vendedorEntitySchema>;

export class VendedorEntity implements VendedorEntityProps {
  id: string;
  nome: string;

  private constructor(props: VendedorEntityProps) {
    Object.assign(this, props);
  }

  static create(
    props: Omit<VendedorEntityProps, 'id'>,
  ): Either<string[], VendedorEntity> {
    const vendedorEntity = new VendedorEntity({ ...props, id: ulid() });

    const result = validateSchema(vendedorEntitySchema, vendedorEntity);

    if (result.isLeft()) return left(result.value);

    return right(vendedorEntity);
  }

  static with(props: VendedorEntityProps) {
    return new VendedorEntity({ ...props });
  }
}
