import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioRepository } from '../usuarios/repositories/usuario.repository';
import { AuthController } from './auth.controller';
import { CadastroUsuarioUsecase } from './usecases/cadastro-usuario.usecase';
import { LoginUsuarioUsecase } from './usecases/login-usuario.usecase';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [CadastroUsuarioUsecase, LoginUsuarioUsecase, UsuarioRepository],
})
export class AuthModule {}
