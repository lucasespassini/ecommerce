import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { DepositoUsuarioDto } from './dto/deposito-usuario.dto';
import { DepositoUsuarioUsecase } from './usecases/deposito-usuario.usecase';

@UseGuards(AuthGuard, RoleGuard)
@Controller('usuario')
export class UsuariosController {
  constructor(
    private readonly depositoUsuarioUsecase: DepositoUsuarioUsecase,
  ) {}

  @Roles(['CLIENTE'])
  @Post('/deposito')
  depositar(
    @Req() { user }: Request,
    @Body() depositoUsuarioDto: DepositoUsuarioDto,
  ) {
    return this.depositoUsuarioUsecase.execute({
      payload: user,
      valor_deposito: depositoUsuarioDto.valor_deposito,
    });
  }
}
