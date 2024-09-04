import { Permissao } from '@prisma/client';

export interface Payload {
  id: string;
  vendedor_id?: string;
  nome: string;
  email: string;
  permissao: Permissao;
}
