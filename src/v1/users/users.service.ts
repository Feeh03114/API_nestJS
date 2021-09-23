import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Funcionario } from '../funcionario/entities/funcionario.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { Telefone } from '../telefone/entities/telefone.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { funcionario } = createUserDto;
    const { endereco, telefones } = funcionario;

    // add endereco ao funcionario
    const enderecoRepository = getRepository(Endereco);
    const enderecoCreated = enderecoRepository.create(endereco);

    const enderecoSaved = await enderecoRepository.save(enderecoCreated);
    const { id: id_endereco } = enderecoSaved;

    const funcionario2 = {
      ...funcionario,
      endereco_id: id_endereco,
    };

    delete funcionario2.endereco;
    delete funcionario2.telefones;

    // add funcionario ao usuario
    const funcionarioRepository = getRepository(Funcionario);
    const funcionarioCreated = funcionarioRepository.create(funcionario2);

    const funcionarioSaved = await funcionarioRepository.save(
      funcionarioCreated,
    );
    const { id: id_funcionario } = funcionarioSaved;

    // add telefone ao funcionario

    const telefoneRepository = getRepository(Telefone);
    telefones.forEach(async (telefone_item) => {
      const telephone = { ...telefone_item, funcionario_id: id_funcionario };

      /* telefone_item
      funcionario_id: id_funcionario,  */
      const telefoneCreated = telefoneRepository.create(telephone);

      await telefoneRepository.save(telefoneCreated);
    });
    const user = {
      ...createUserDto,
      funcionario_id: id_funcionario,
    };

    delete user.funcionario;

    const userCreate = this.usersRepository.create(user);
    const userSaved = this.usersRepository.save(userCreate);

    const Return = {
      Status: 'Cadastro com Sucesso!!',
      Id_User: (await userSaved).id,
    };
    return Return;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    this.usersRepository.update(id, updateUserDto);
    return updateUserDto;
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return 'Usuário removido';
  }
}
