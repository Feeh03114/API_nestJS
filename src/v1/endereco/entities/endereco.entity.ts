import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  Rua!: string;

  @Column({ type: 'varchar', unique: true })
  Numero!: number;

  @Column({ type: 'varchar' })
  Bairro!: string;

  @Column({ type: 'varchar' })
  Cidade!: string;

  @Column({ type: 'char', length: 2 })
  UF!: string;

  @Column()
  CEP!: number;
}
