import { Injectable } from '@nestjs/common';
import { IProdutoRepository } from 'src/interfaces/repositories/produto-repository.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ulid } from 'ulid';
import { ProdutoEntity } from '../entities/produto.entity';

@Injectable()
export class ProdutoRepository implements IProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async criar(produtoEntity: ProdutoEntity): Promise<void> {
    await this.prisma.produto.create({
      data: {
        prd_id: produtoEntity.id,
        prd_vdd_id: produtoEntity.vendedor.id,
        prd_nome: produtoEntity.nome,
        prd_estoque: produtoEntity.estoque,
        produto_vigencia_valores: {
          create: { pvv_id: ulid(), pvv_valor_vigencia: produtoEntity.valor },
        },
      },
    });
  }
}
