import { Injectable } from '@nestjs/common';
import { ICarrinhoRepository } from 'src/interfaces/repositories/carrinho-repository.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProdutoEntity } from 'src/modules/produtos/entities/produto.entity';
import { ulid } from 'ulid';

@Injectable()
export class CarrinhoRepository implements ICarrinhoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async adicionarAoCarrinho(
    usuario_id: string,
    produtoEntity: ProdutoEntity,
  ): Promise<void> {
    let carrinho = await this.prisma.carrinho.findFirst({
      where: { AND: [{ crh_usr_id: usuario_id }, { crh_cmp_id: null }] },
    });

    if (!carrinho) {
      carrinho = await this.prisma.carrinho.create({
        data: { crh_id: ulid(), crh_usr_id: usuario_id },
      });
    }

    const produtoVigenciaValor =
      await this.prisma.produtoVigenciaValor.findMany({
        take: 1,
        orderBy: { pvv_id: 'desc' },
        where: { pvv_prd_id: produtoEntity.id },
      });

    await this.prisma.carrinhoProdutos.create({
      data: {
        crp_id: ulid(),
        crp_crh_id: carrinho.crh_id,
        crp_prd_id: produtoEntity.id,
        crp_pvv_id: produtoVigenciaValor[0].pvv_id,
      },
    });
  }
}
