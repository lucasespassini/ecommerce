import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { AdicionarProdutoCarrinhoDto } from './dto/adicionar-produto-carrinho.dto';
import { ComprarCarrinhoDto } from './dto/comprar-carrinho.dto';
import { AdicionarProdutoAoCarrinhoUsecase } from './usecases/adicionar-produto-carrinho.usecase';
import { BuscarCarrinhoUsecase } from './usecases/buscar-carrinho.usecase';
import { ComprarCarrinhoUsecase } from './usecases/comprar-carrinho.usecase';

@UseGuards(AuthGuard, RoleGuard)
@Controller('carrinho')
export class CarrinhoController {
  constructor(
    private readonly buscarCarrinhoUsecase: BuscarCarrinhoUsecase,
    private readonly adicionarProdutoAoCarrinhoUsecase: AdicionarProdutoAoCarrinhoUsecase,
    private readonly comprarCarrinhoUsecase: ComprarCarrinhoUsecase,
  ) {}

  @Roles(['CLIENTE'])
  @Get('/buscar')
  buscarCarrinho(@Req() { user }: Request) {
    return this.buscarCarrinhoUsecase.execute({ payload: user });
  }

  @Roles(['CLIENTE'])
  @Post('/adicionar-produto')
  adicionarProduto(
    @Req() { user }: Request,
    @Body() adicionarProdutoCarrinhoDto: AdicionarProdutoCarrinhoDto,
  ) {
    return this.adicionarProdutoAoCarrinhoUsecase.execute({
      payload: user,
      adicionarProdutoCarrinhoDto,
    });
  }

  @Roles(['CLIENTE'])
  @Post('/comprar')
  comprarCarrinho(
    @Req() { user }: Request,
    @Body() comprarCarrinhoDto: ComprarCarrinhoDto,
  ) {
    return this.comprarCarrinhoUsecase.execute({
      payload: user,
      comprarCarrinhoDto,
    });
  }
}
