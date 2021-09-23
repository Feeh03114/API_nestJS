import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { Funcionario } from './entities/funcionario.entity';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private funcionarioRepository: Repository<Funcionario>,
  ) {}
  create(createFuncionarioDto: CreateFuncionarioDto) {
    this.funcionarioRepository.insert(createFuncionarioDto);
    return createFuncionarioDto;
  }

  findAll() {
    return this.funcionarioRepository.find();
  }

  findOne(id: string) {
    return this.funcionarioRepository.findOne(id);
  }

  update(id: string, updateFuncionarioDto: UpdateFuncionarioDto) {
    this.funcionarioRepository.update(id, updateFuncionarioDto);
    return updateFuncionarioDto;
  }

  async remove(id: string) {
    await this.funcionarioRepository.delete(id);
    return 'Funcionario removido';
  }
}
