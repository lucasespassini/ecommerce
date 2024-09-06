import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { BuscarProdutosQueryDto } from './dto/buscar-produtos.dto';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { BuscarProdutosUsecase } from './usecases/buscar-produtos.usecase';
import { CriarProdutoUsecase } from './usecases/criar-produto.usecase';

@UseGuards(AuthGuard, RoleGuard)
@Controller('produto')
export class ProdutosController {
  constructor(
    private readonly criarProdutoUsecase: CriarProdutoUsecase,
    private readonly buscarProdutosUsecase: BuscarProdutosUsecase,
  ) {}

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

  @Get('/buscar')
  buscarProdutos(@Query() { vendedor_id }: BuscarProdutosQueryDto) {
    return this.buscarProdutosUsecase.execute({ vendedor_id });
  }
}
