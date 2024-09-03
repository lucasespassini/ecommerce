import { ulid } from 'ulid';

type VendedorEntityProps = {
  id: string;
  nome: string;
};

export class VendedorEntity {
  id: string;
  nome: string;

  private constructor(props: VendedorEntityProps) {
    Object.assign(this, props);
  }

  static create(props: Omit<VendedorEntityProps, 'id'>) {
    return new VendedorEntity({ ...props, id: ulid() });
  }

  static with(props: VendedorEntityProps) {
    return new VendedorEntity({ ...props });
  }
}
