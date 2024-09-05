import { BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from 'src/interfaces/payload.interface';
import { Usecase } from 'src/interfaces/usecase.interface';
import { UsuarioEntity } from 'src/modules/usuarios/entities/usuario.entity';
import { UsuarioRepository } from 'src/modules/usuarios/repositories/usuario.repository';
import { LoginDto } from '../dto/login.dto';

type LoginUsuarioUsecaseInput = LoginDto;
type LoginUsuarioUsecaseOutput = { token: string };

export class LoginUsuarioUsecase
  implements Usecase<LoginUsuarioUsecaseInput, LoginUsuarioUsecaseOutput>
{
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({
    email,
    senha,
  }: LoginUsuarioUsecaseInput): Promise<LoginUsuarioUsecaseOutput> {
    const usuarioEntity = await this.usuarioRepository.buscarPorEmail(email);

    if (usuarioEntity.isLeft())
      throw new BadRequestException(['usuário não encontrado']);

    const result = this.usuarioRepository.compararSenhas(
      senha,
      usuarioEntity.value.senha || '',
    );

    if (!result) throw new BadRequestException(['senha inválida']);

    return this.presentOutput(usuarioEntity.value);
  }

  private async presentOutput(
    usuarioEntity: UsuarioEntity,
  ): Promise<LoginUsuarioUsecaseOutput> {
    const payload: Payload = {
      id: usuarioEntity.id,
      email: usuarioEntity.email,
      nome: usuarioEntity.nome,
      permissao: usuarioEntity.permissao,
    };

    if (usuarioEntity.permissao === 'VENDEDOR' && usuarioEntity.vendedor) {
      payload.vendedor = usuarioEntity.vendedor;
    }

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
