import {
  ProdutoEntity,
  produtoEntitySchema,
} from 'src/modules/produtos/entities/produto.entity';
import { left } from 'src/utils/either';
import { validateSchema } from 'src/utils/validateSchema';
import { ulid } from 'ulid';
import { z } from 'zod';

const carrinhoEntitySchema = z.object({
  id: z.string().ulid(),
  valor_total: z.number().min(0),
  produtos: z.array(produtoEntitySchema),
});

type CarrinhoEntityProps = z.infer<typeof carrinhoEntitySchema>;

export class CarrinhoEntity implements CarrinhoEntityProps {
  id: string;
  valor_total: number;
  produtos: ProdutoEntity[];

  private constructor(props: CarrinhoEntityProps) {
    Object.assign(this, props);
  }

  static create(props: Omit<CarrinhoEntityProps, 'id'>) {
    const carrinhoEntity = new CarrinhoEntity({ ...props, id: ulid() });

    const result = validateSchema(carrinhoEntitySchema, carrinhoEntity);
    if (result.isLeft()) return left(result.value);

    return carrinhoEntity;
  }

  static with(props: CarrinhoEntityProps) {
    return new CarrinhoEntity({ ...props });
  }
}
