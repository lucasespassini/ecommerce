import { Module } from '@nestjs/common';
import { UsuarioRepository } from '../usuarios/repositories/usuario.repository';
import { AuthController } from './auth.controller';
import { CadastroUsuarioUsecase } from './usecases/cadastro-usuario.usecase';
import { LoginUsuarioUsecase } from './usecases/login-usuario.usecase';

@Module({
  controllers: [AuthController],
  providers: [CadastroUsuarioUsecase, LoginUsuarioUsecase, UsuarioRepository],
})
export class AuthModule {}
