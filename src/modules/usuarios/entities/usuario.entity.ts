import { Permissao } from '@prisma/client';
import { VendedorEntity } from 'src/modules/vendedores/entities/vendedor.entity';
import { ulid } from 'ulid';

type UsuarioEntityProps = {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  valor_saldo: number;
  permissao: Permissao;
  vendedor?: VendedorEntity;
};

export class UsuarioEntity {
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

  static create(props: Omit<UsuarioEntityProps, 'id' | 'valor_saldo'>) {
    return new UsuarioEntity({ ...props, id: ulid(), valor_saldo: 0 });
  }

  static with(props: Omit<UsuarioEntityProps, 'senha'>) {
    return new UsuarioEntity({ ...props });
  }
}
