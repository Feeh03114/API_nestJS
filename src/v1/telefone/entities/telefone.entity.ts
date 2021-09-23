import { Funcionario } from 'src/v1/funcionario/entities/funcionario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Telefone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  Telefone: string;

  @Column()
  funcionario_id: string;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario)
  @JoinColumn({ name: 'funcionario_id' })
  Funcionario: Funcionario;
}
