import { Injectable } from '@nestjs/common';
import { ICarrinhoRepository } from 'src/interfaces/repositories/carrinho-repository.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ProdutoEntity } from 'src/modules/produtos/entities/produto.entity';
import { VendedorEntity } from 'src/modules/vendedores/entities/vendedor.entity';
import { ulid } from 'ulid';
import { ProdutoDto } from '../dto/comprar-carrinho.dto';
import { CarrinhoEntity } from '../entities/carrinho.entity';

@Injectable()
export class CarrinhoRepository implements ICarrinhoRepository {
  constructor(private readonly prisma: PrismaService) {}

  private async buscarOuCriar(usuario_id: string) {
    let carrinho = await this.prisma.carrinho.findFirst({
      include: {
        carrinho_produtos: {
          include: {
            produto_vigencia_valor: {
              include: { produto: { include: { vendedor: true } } },
            },
          },
        },
      },
      where: { AND: [{ crh_usr_id: usuario_id }, { crh_cmp_id: null }] },
    });

    if (!carrinho) {
      carrinho = await this.prisma.carrinho.create({
        include: {
          carrinho_produtos: {
            include: {
              produto_vigencia_valor: {
                include: { produto: { include: { vendedor: true } } },
              },
            },
          },
        },
        data: { crh_id: ulid(), crh_usr_id: usuario_id },
      });
    }

    return carrinho;
  }

  async adicionarAoCarrinho(
    usuario_id: string,
    quantidade: number,
    produtoEntity: ProdutoEntity,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const carrinho = await this.buscarOuCriar(usuario_id);

      const produtoVigenciaValor = await tx.produtoVigenciaValor.findMany({
        take: 1,
        orderBy: { pvv_id: 'desc' },
        where: { pvv_prd_id: produtoEntity.id },
      });

      const carrinho_produtos = await tx.carrinhoProdutos.findFirst({
        where: {
          AND: [
            { crp_crh_id: carrinho.crh_id },
            { produto_vigencia_valor: { pvv_prd_id: produtoEntity.id } },
          ],
        },
      });

      const valor_produtos = produtoEntity.valor * quantidade;

      const valor_total = carrinho_produtos
        ? valor_produtos
        : valor_produtos + carrinho.crh_valor_total.toNumber();

      await Promise.all([
        tx.carrinho.update({
          data: { crh_valor_total: valor_total },
          where: { crh_id: carrinho.crh_id },
        }),
        tx.carrinhoProdutos.upsert({
          create: {
            crp_id: ulid(),
            crp_quantidade: quantidade,
            crp_crh_id: carrinho.crh_id,
            crp_pvv_id: produtoVigenciaValor[0].pvv_id,
          },
          update: { crp_quantidade: quantidade },
          where: { crp_id: carrinho_produtos?.crp_id || '' },
        }),
      ]);
    });
  }

  async buscarCarrinho(usuario_id: string): Promise<CarrinhoEntity> {
    const carrinhoDb = await this.buscarOuCriar(usuario_id);

    const produtosEntity = carrinhoDb.carrinho_produtos.map(
      ({ produto_vigencia_valor }) => {
        const { produto } = produto_vigencia_valor;

        const vendedorEntity = VendedorEntity.with({
          id: produto.vendedor.vdd_id,
          nome: produto.vendedor.vdd_nome,
        });

        const produtoEntity = ProdutoEntity.with({
          id: produto.prd_id,
          nome: produto.prd_nome,
          estoque: produto.prd_estoque,
          valor: produto_vigencia_valor.pvv_valor_vigencia.toNumber(),
          vendedor: vendedorEntity,
        });

        return produtoEntity;
      },
    );

    const carrinhoEntity = CarrinhoEntity.with({
      id: carrinhoDb.crh_id,
      valor_total: carrinhoDb.crh_valor_total.toNumber(),
      produtos: produtosEntity,
    });

    return carrinhoEntity;
  }

  async comprarProdutos(
    usuario_id: string,
    produtosDto: ProdutoDto[],
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      tx;
    });
  }
}
