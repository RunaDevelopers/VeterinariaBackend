import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clientes } from 'src/entities';
import { ClientesService } from 'src/services/clientes/clientes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Clientes])],
    providers: [ClientesService],
    exports: [ClientesService],
})
export class ClientesModule { }
