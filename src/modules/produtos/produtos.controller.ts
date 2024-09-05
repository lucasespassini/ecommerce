import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { CriarProdutoUsecase } from './usecases/criar-produto.usecase';

@UseGuards(AuthGuard, RoleGuard)
@Controller('produto')
export class ProdutosController {
  constructor(private readonly criarProdutoUsecase: CriarProdutoUsecase) {}

  @Roles(['VENDEDOR'])
  @Post('/criar')
  criarProduto(
    @Req() { user }: Request,
    @Body() criarProdutoDto: CriarProdutoDto,
  ) {
    return this.criarProdutoUsecase.execute({
      payload: user,
      criarProdutoDto,
    });
  }
}
