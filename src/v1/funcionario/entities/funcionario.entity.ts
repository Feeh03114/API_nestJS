import { Cargo } from 'src/v1/cargo/entities/cargo.entity';
import { Endereco } from 'src/v1/endereco/entities/endereco.entity';
import { Telefone } from 'src/v1/telefone/entities/telefone.entity';
import { User } from 'src/v1/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Name!: string;

  @OneToOne(() => User)
  Usuario: User;

  @Column()
  cargo_id: string;

  @ManyToOne(() => Cargo, (cargo) => cargo.Cargo)
  @JoinColumn({ name: 'cargo_id' })
  Cargo: Cargo;

  @Column()
  endereco_id: string;

  @ManyToOne(() => Endereco, (endereco) => endereco.id)
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;

  @OneToMany(() => Telefone, (telefone) => telefone.Telefone)
  telefones: Telefone[];
}
