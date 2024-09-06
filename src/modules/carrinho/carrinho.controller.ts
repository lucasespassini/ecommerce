import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { AdicionarProdutoCarrinhoDto } from './dto/adicionar-produto-carrinho.dto';
import { AdicionarProdutoAoCarrinhoUsecase } from './usecases/adicionar-produto-carrinho.usecase';

@UseGuards(AuthGuard, RoleGuard)
@Controller('carrinho')
export class CarrinhoController {
  constructor(
    private readonly adicionarProdutoAoCarrinhoUsecase: AdicionarProdutoAoCarrinhoUsecase,
  ) {}

  @Roles(['CLIENTE'])
  @Post('/adicionar-produto')
  adicionarProduto(
    @Req() { user }: Request,
    @Body() adicionarProdutoCarrinhoDto: AdicionarProdutoCarrinhoDto,
  ) {
    return this.adicionarProdutoAoCarrinhoUsecase.execute({
      payload: user,
      produto_id: adicionarProdutoCarrinhoDto.produto_id,
    });
  }
}
