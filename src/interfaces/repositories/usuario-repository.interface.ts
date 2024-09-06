import { UsuarioEntity } from 'src/modules/usuarios/entities/usuario.entity';
import { Either } from 'src/utils/either';

export interface IUsuarioRepository {
  criar(usuarioEntity: UsuarioEntity): Promise<void>;
  buscarPorEmail(email: string): Promise<Either<null, UsuarioEntity>>;
  compararSenhas(senhaPlana: string, senhaHash: string): boolean;
  depositar(usuario_id: string, valor_deposito: number): Promise<void>;
}
