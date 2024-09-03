import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { VendedoresModule } from './modules/vendedores/vendedores.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsuariosModule,
    VendedoresModule,
  ],
})
export class AppModule {}
