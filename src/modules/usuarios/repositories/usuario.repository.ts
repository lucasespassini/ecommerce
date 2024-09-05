import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { IUsuarioRepository } from 'src/interfaces/usuario-repository.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { VendedorEntity } from 'src/modules/vendedores/entities/vendedor.entity';
import { Either, left, right } from 'src/utils/either';
import { UsuarioEntity } from '../entities/usuario.entity';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async criar(usuarioEntity: UsuarioEntity): Promise<void> {
    const vendedor =
      usuarioEntity.permissao === 'VENDEDOR' && usuarioEntity.vendedor
        ? {
            create: {
              vdd_id: usuarioEntity.vendedor.id,
              vdd_nome: usuarioEntity.vendedor.nome,
              vdd_avaliacao: 0,
            },
          }
        : {};

    await this.prisma.usuario.create({
      data: {
        usr_id: usuarioEntity.id,
        usr_email: usuarioEntity.email,
        usr_nome: usuarioEntity.nome,
        usr_permissao: usuarioEntity.permissao,
        usr_senha: hashSync(usuarioEntity.senha || '', 10),
        usr_valor_saldo: 0,
        vendedor,
      },
    });
  }

  async buscarPorEmail(email: string): Promise<Either<null, UsuarioEntity>> {
    const usuarioDb = await this.prisma.usuario.findUnique({
      include: { vendedor: true },
      where: { usr_email: email },
    });

    if (!usuarioDb) return left(null);

    const usuarioEntity = UsuarioEntity.with({
      id: usuarioDb.usr_id,
      nome: usuarioDb.usr_nome,
      email: usuarioDb.usr_email,
      permissao: usuarioDb.usr_permissao,
      valor_saldo: usuarioDb.usr_valor_saldo.toNumber(),
      senha: usuarioDb.usr_senha,
    });

    if (usuarioEntity.permissao === 'VENDEDOR' && usuarioDb.vendedor) {
      const vendedorEntity = VendedorEntity.with({
        id: usuarioDb.vendedor.vdd_id,
        nome: usuarioDb.vendedor.vdd_nome,
      });

      usuarioEntity.vendedor = vendedorEntity;
    }

    return right(usuarioEntity);
  }

  compararSenhas(senhaPlana: string, senhaHash: string): boolean {
    return compareSync(senhaPlana, senhaHash);
  }
}
