import {
  VendedorEntity,
  vendedorEntitySchema,
} from 'src/modules/vendedores/entities/vendedor.entity';
import { Either, left, right } from 'src/utils/either';
import { validateSchema } from 'src/utils/validateSchema';
import { ulid } from 'ulid';
import { z } from 'zod';

const produtoEntitySchema = z.object({
  id: z.string().ulid(),
  nome: z.string().min(3, 'nome do produto inválido'),
  estoque: z.number().min(0, 'estoque inválido'),
  valor: z.number().positive('valor inválido'),
  vendedor: z.object(vendedorEntitySchema.shape),
});

type ProdutoEntityProps = z.infer<typeof produtoEntitySchema>;

export class ProdutoEntity implements ProdutoEntityProps {
  id: string;
  nome: string;
  estoque: number;
  valor: number;
  vendedor: VendedorEntity;

  private constructor(props: ProdutoEntityProps) {
    Object.assign(this, props);
  }

  static create(
    props: Omit<ProdutoEntityProps, 'id' | 'vendedor.nome'>,
  ): Either<string[], ProdutoEntity> {
    const produtoEntity = new ProdutoEntity({ ...props, id: ulid() });

    const result = validateSchema(produtoEntitySchema, produtoEntity);

    if (result.isLeft()) return left(result.value);

    return right(produtoEntity);
  }

  static with(props: ProdutoEntityProps) {
    return new ProdutoEntity({ ...props });
  }
}
