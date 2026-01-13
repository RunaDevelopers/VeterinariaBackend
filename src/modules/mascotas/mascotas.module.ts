import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { MascotaController } from '../../controllers/mascota/mascota.controller';
import { Mascotas } from '../../entities/Mascotas';
import { ClientesModule } from '../clientes/clientes.module';
import { EspeciesModule } from '../especies/especies.module';
import { RazasModule } from '../razas/razas.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Mascotas]),
        ClientesModule,
        EspeciesModule,
        RazasModule,
    ],
    controllers: [MascotaController],
    providers: [MascotasService],
    exports: [MascotasService],
})
export class MascotasModule { }
