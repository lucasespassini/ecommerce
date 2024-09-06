import { Module } from '@nestjs/common';
import { UsuarioRepository } from './repositories/usuario.repository';
import { DepositoUsuarioUsecase } from './usecases/deposito-usuario.usecase';
import { UsuariosController } from './usuarios.controller';

@Module({
  controllers: [UsuariosController],
  providers: [DepositoUsuarioUsecase, UsuarioRepository],
})
export class UsuariosModule {}
