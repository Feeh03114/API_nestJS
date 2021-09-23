import { Funcionario } from 'src/v1/funcionario/entities/funcionario.entity';

export class CreateUserDto {
  email: string;
  Password: string;
  Cliente: boolean;
  funcionario_id: string;
  funcionario: Funcionario;
}
