import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cargo } from './v1/cargo/entities/cargo.entity';
import { Endereco } from './v1/endereco/entities/endereco.entity';
import { Funcionario } from './v1/funcionario/entities/funcionario.entity';
import { Telefone } from './v1/telefone/entities/telefone.entity';
import { User } from './v1/users/entities/user.entity';

import { CargoModule } from './v1/cargo/cargo.module';
import { EnderecoModule } from './v1/endereco/endereco.module';
import { FuncionarioModule } from './v1/funcionario/funcionario.module';
import { TelefoneModule } from './v1/telefone/telefone.module';
import { UsersModule } from './v1/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.eqaibstccigcsysgaeao.supabase.co',
      port: 6543,
      username: 'postgres',
      password: 'Unisobancodados',
      database: 'postgres',
      entities: [User, Telefone, Funcionario, Endereco, Cargo],
      synchronize: true,
    }),
    UsersModule,
    EnderecoModule,
    CargoModule,
    FuncionarioModule,
    TelefoneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
