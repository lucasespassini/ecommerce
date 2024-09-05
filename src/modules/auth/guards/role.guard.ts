import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissao } from '@prisma/client';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissoesRequeridas = this.reflector.get<Permissao[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!permissoesRequeridas) return true;

    const { user } = context.switchToHttp().getRequest<Request>();

    return permissoesRequeridas.some(
      (permissao) => user?.permissao === permissao,
    );
  }
}
