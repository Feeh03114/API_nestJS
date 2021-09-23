import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { Cargo } from './entities/cargo.entity';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private cargoRepository: Repository<Cargo>,
  ) {}
  create(createCargoDto: CreateCargoDto) {
    this.cargoRepository.insert(createCargoDto);
    return createCargoDto;
  }

  findAll() {
    return this.cargoRepository.find();
  }

  findOne(id: string) {
    return this.cargoRepository.findOne(id);
  }

  update(id: string, updateCargoDto: UpdateCargoDto) {
    this.cargoRepository.update(id, updateCargoDto);
    return updateCargoDto;
  }

  async remove(id: string) {
    await this.cargoRepository.delete(id);
    return 'Funcionario removido';
  }
}
