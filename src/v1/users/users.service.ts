import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Funcionario } from '../funcionario/entities/funcionario.entity';
import { Endereco } from '../endereco/entities/endereco.entity';
import { Telefone } from '../telefone/entities/telefone.entity';
import { Cargo } from '../cargo/entities/cargo.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { funcionario } = createUserDto;
    const { endereco, telefones } = funcionario;
    let funcionarioSaved;

    // add endereco ao funcionario
    if (!funcionario.endereco_id) {
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

      funcionarioSaved = await funcionarioRepository.save(funcionarioCreated);
    } else {
      delete funcionario.telefones;
      const funcionarioRepository = getRepository(Funcionario);
      const funcionarioCreated = funcionarioRepository.create(funcionario);

      funcionarioSaved = await funcionarioRepository.save(funcionarioCreated);
    }
    const { id: id_funcionario } = funcionarioSaved;

    // add telefone ao funcionario
    const telefoneRepository = getRepository(Telefone);
    telefones.forEach(async (telefone_item) => {
      const telephone = { ...telefone_item, funcionario_id: id_funcionario };

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

  async findOne(id: string) {
    const funcionarioRepository = getRepository(Funcionario);
    const enderecoRepository = getRepository(Endereco);
    const cargoRepository = getRepository(Cargo);
    const telefoneRepository = getRepository(Telefone);

    const get_user = await this.usersRepository.findOne(id);
    const get_funcionario = await funcionarioRepository.findOne(
      get_user.funcionario_id,
    );
    const endereco = await enderecoRepository.findOne(
      get_funcionario.endereco_id,
    );
    const cargo = await cargoRepository.findOne(get_funcionario.cargo_id);
    const telefones = await telefoneRepository.find({
      select: ['id', 'Telefone'],
      where: { funcionario_id: get_funcionario.id },
    });
    const funcionario = {
      ...get_funcionario,
      endereco: endereco,
      Cargo: cargo,
      telefones: telefones,
    };
    delete funcionario.cargo_id;
    delete funcionario.endereco_id;

    const user = {
      ...get_user,
      funcionario: funcionario,
    };

    delete user.funcionario_id;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    const userUpdate = await this.usersRepository.findOne(id);
    delete userUpdate.Password;
    return userUpdate;
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return { Status: 'Usuário removido' };
  }
}
