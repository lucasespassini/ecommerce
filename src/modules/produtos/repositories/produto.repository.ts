import { Injectable } from '@nestjs/common';
import { IProdutoRepository } from 'src/interfaces/repositories/produto-repository.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Either, left, right } from 'src/utils/either';
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

  async buscarPorId(produto_id: string): Promise<Either<null, ProdutoEntity>> {
    const produtoDb = await this.prisma.produto.findUnique({
      include: {
        vendedor: true,
        produto_vigencia_valores: { take: 1, orderBy: { pvv_id: 'desc' } },
      },
      where: { prd_id: produto_id },
    });

    if (!produtoDb) return left(null);

    const produtoEntity = ProdutoEntity.with({
      id: produtoDb.prd_id,
      estoque: produtoDb.prd_estoque,
      nome: produtoDb.prd_nome,
      valor:
        produtoDb.produto_vigencia_valores[0].pvv_valor_vigencia.toNumber(),
      vendedor: {
        id: produtoDb.vendedor.vdd_id,
        nome: produtoDb.vendedor.vdd_nome,
      },
    });

    return right(produtoEntity);
  }
}
