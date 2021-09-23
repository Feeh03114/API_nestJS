import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTelefoneDto } from './dto/create-telefone.dto';
import { UpdateTelefoneDto } from './dto/update-telefone.dto';
import { Telefone } from './entities/telefone.entity';

@Injectable()
export class TelefoneService {
  constructor(
    @InjectRepository(Telefone)
    private telefoneRepository: Repository<Telefone>,
  ) {}
  create(createTelefoneDto: CreateTelefoneDto) {
    this.telefoneRepository.insert(createTelefoneDto);
    return createTelefoneDto;
  }

  findAll() {
    return this.telefoneRepository.find();
  }

  findOne(id: string) {
    return this.telefoneRepository.findOne(id);
  }

  update(id: string, updateTelefoneDto: UpdateTelefoneDto) {
    this.telefoneRepository.update(id, updateTelefoneDto);
    return updateTelefoneDto;
  }

  async remove(id: string) {
    await this.telefoneRepository.delete(id);
    return 'Usuário removido';
  }
}
