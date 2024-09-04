import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/interfaces/payload.interface';
import { Usecase } from 'src/interfaces/usecase.interface';
import { UsuarioEntity } from 'src/modules/usuarios/entities/usuario.entity';
import { UsuarioRepository } from 'src/modules/usuarios/repositories/usuario.repository';
import { VendedorEntity } from 'src/modules/vendedores/entities/vendedor.entity';
import { CadastroDto } from '../dto/cadastro.dto';

type CadastroUsuarioUsecaseOutput = {
  token: string;
};

export class CadastroUsuarioUsecase
  implements Usecase<CadastroDto, CadastroUsuarioUsecaseOutput>
{
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    nome,
    email,
    senha,
    permissao,
    vendedor_nome,
  }: CadastroDto): Promise<CadastroUsuarioUsecaseOutput> {
    const usuarioComMesmoEmail =
      await this.usuarioRepository.buscarPorEmail(email);

    if (usuarioComMesmoEmail.isRight()) {
      throw new BadRequestException(['usuário com mesmo e-mail já cadastrado']);
    }

    const usuarioEntity = UsuarioEntity.create({
      nome,
      email,
      senha,
      permissao,
    });

    if (usuarioEntity.isLeft())
      throw new BadRequestException(usuarioEntity.value);

    if (permissao === 'VENDEDOR') {
      const vendedorEntity = VendedorEntity.create({ nome: vendedor_nome });

      if (vendedorEntity.isLeft())
        throw new BadRequestException(vendedorEntity.value);

      usuarioEntity.value.vendedor = vendedorEntity.value;
    }

    await this.usuarioRepository.criar(usuarioEntity.value);

    return this.presentOutput(usuarioEntity.value);
  }

  private async presentOutput(
    usuarioEntity: UsuarioEntity,
  ): Promise<CadastroUsuarioUsecaseOutput> {
    const payload: Payload = {
      id: usuarioEntity.id,
      vendedor_id: usuarioEntity?.vendedor?.id,
      email: usuarioEntity.email,
      nome: usuarioEntity.nome,
      permissao: usuarioEntity.permissao,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
