import { BadRequestException, Inject } from '@nestjs/common';
import { Usecase } from 'src/interfaces/usecase.interface';
import { UsuarioEntity } from 'src/modules/usuarios/entities/usuario.entity';
import { UsuarioRepository } from 'src/modules/usuarios/repositories/usuario.repository';
import { VendedorEntity } from 'src/modules/vendedores/entities/vendedor.entity';
import { CadastroDto } from '../dto/cadastro.dto';

export class CadastroUsuarioUsecase implements Usecase<CadastroDto> {
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute({
    nome,
    email,
    senha,
    permissao,
    vendedor_nome,
  }: CadastroDto): Promise<void> {
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

    if (permissao === 'VENDEDOR') {
      if (vendedor_nome?.length < 3)
        throw new BadRequestException(['nome do vendedor inválido']);

      const vendedorEntity = VendedorEntity.create({ nome: vendedor_nome });
      usuarioEntity.vendedor = vendedorEntity;
    }

    await this.usuarioRepository.criar(usuarioEntity);
  }
}
