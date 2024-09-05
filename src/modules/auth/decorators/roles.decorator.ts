import { SetMetadata } from '@nestjs/common';
import { Permissao } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (roles: Permissao[]) => SetMetadata(ROLES_KEY, roles);
