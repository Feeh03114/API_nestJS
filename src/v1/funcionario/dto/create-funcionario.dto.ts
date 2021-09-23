import { Endereco } from 'src/v1/endereco/entities/endereco.entity';
import { Telefone } from 'src/v1/telefone/entities/telefone.entity';
import { User } from 'src/v1/users/entities/user.entity';

export class CreateFuncionarioDto {
  Name: string;
  cargo_id: string;
  endereco_id: string;
  endereco: Endereco;
  telefones: Telefone[];
  Usuario?: User;
}
