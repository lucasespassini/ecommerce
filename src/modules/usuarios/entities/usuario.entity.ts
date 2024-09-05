import { Permissao } from '@prisma/client';
import {
  VendedorEntity,
  vendedorEntitySchema,
} from 'src/modules/vendedores/entities/vendedor.entity';
import { Either, left, right } from 'src/utils/either';
import { validateSchema } from 'src/utils/validateSchema';
import { ulid } from 'ulid';
import { z } from 'zod';

const usuarioEntitySchema = z.object({
  id: z.string().ulid('id inválido'),
  nome: z.string().min(3, 'nome inválido'),
  email: z.string().email('email inválido'),
  senha: z.string().min(5, 'senha deve ter pelo menos 5 caracteres').optional(),
  valor_saldo: z.number({ message: 'saldo inválido' }),
  permissao: z.enum(['CLIENTE', 'VENDEDOR'], {
    message: 'permissão deve ser CLIENTE ou VENDEDOR',
  }),
  vendedor: z.object(vendedorEntitySchema.shape).optional(),
});

type UsuarioEntityProps = z.infer<typeof usuarioEntitySchema>;

export class UsuarioEntity implements UsuarioEntityProps {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  valor_saldo: number;
  permissao: Permissao;
  vendedor?: VendedorEntity;

  private constructor(props: UsuarioEntityProps) {
    Object.assign(this, props);
  }

  static create(
    props: Omit<UsuarioEntityProps, 'id' | 'valor_saldo'>,
  ): Either<string[], UsuarioEntity> {
    const usuarioEntity = new UsuarioEntity({
      ...props,
      id: ulid(),
      valor_saldo: 0,
    });

    const result = validateSchema(usuarioEntitySchema, usuarioEntity);

    if (result.isLeft()) return left(result.value);

    return right(usuarioEntity);
  }

  static with(props: UsuarioEntityProps) {
    return new UsuarioEntity({ ...props });
  }
}
