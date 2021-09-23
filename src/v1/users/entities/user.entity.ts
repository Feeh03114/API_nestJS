import { Funcionario } from 'src/v1/funcionario/entities/funcionario.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email!: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  Password!: string;

  @Column({ default: true })
  Cliente!: boolean;

  @Column()
  funcionario_id!: string;

  @JoinColumn({ name: 'funcionario_id' })
  @OneToOne(() => Funcionario)
  funcionario: Funcionario;
}
