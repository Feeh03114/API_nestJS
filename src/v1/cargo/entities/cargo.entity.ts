import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  Cargo!: string;

  @Column({ type: 'varchar' })
  Descricao!: string;
}
