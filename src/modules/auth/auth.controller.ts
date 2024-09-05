import { Body, Controller, Post } from '@nestjs/common';
import { CadastroDto } from './dto/cadastro.dto';
import { LoginDto } from './dto/login.dto';
import { CadastroUsuarioUsecase } from './usecases/cadastro-usuario.usecase';
import { LoginUsuarioUsecase } from './usecases/login-usuario.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly cadastroUsuarioUsecase: CadastroUsuarioUsecase,
    private readonly loginUsuarioUsecase: LoginUsuarioUsecase,
  ) {}

  @Post('/cadastro')
  cadastro(@Body() cadastroDto: CadastroDto) {
    return this.cadastroUsuarioUsecase.execute(cadastroDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.loginUsuarioUsecase.execute(loginDto);
  }
}
