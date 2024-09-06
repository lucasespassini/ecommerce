import { Inject } from '@nestjs/common';
import { Payload } from 'src/interfaces/payload.interface';
import { Usecase } from 'src/interfaces/usecase.interface';
import { UsuarioRepository } from '../repositories/usuario.repository';

type DepositoUsuarioUsecaseInput = {
  payload: Payload;
  valor_deposito: number;
};

export class DepositoUsuarioUsecase
  implements Usecase<DepositoUsuarioUsecaseInput, void>
{
  constructor(
    @Inject(UsuarioRepository)
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async execute({
    payload,
    valor_deposito,
  }: DepositoUsuarioUsecaseInput): Promise<void> {
    await this.usuarioRepository.depositar(payload.id, valor_deposito);
  }
}
