import { Permissao } from '@prisma/client';

export interface Payload {
  id: string;
  nome: string;
  email: string;
  permissao: Permissao;
  vendedor?: {
    id: string;
    nome: string;
  };
}
