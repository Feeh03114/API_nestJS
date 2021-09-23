import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,
  ) {}
  create(createEnderecoDto: CreateEnderecoDto) {
    this.enderecoRepository.insert(createEnderecoDto);
    return createEnderecoDto;
  }

  findAll() {
    return this.enderecoRepository.find();
  }

  findOne(id: string) {
    return this.enderecoRepository.findOne(id);
  }

  update(id: string, updateEnderecoDto: UpdateEnderecoDto) {
    this.enderecoRepository.update(id, updateEnderecoDto);
    return updateEnderecoDto;
  }

  async remove(id: string) {
    await this.enderecoRepository.delete(id);
    return 'Funcionario removido';
  }
}
