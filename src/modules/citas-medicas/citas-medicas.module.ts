import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasMedicas } from 'src/entities';
import { CitasMedicasService } from 'src/services/citas-medicas/citas-medicas.service';
import { CitasMedicasController } from 'src/controllers/citas-medicas/citas-medicas.controller';
import { ClientesModule } from '../clientes/clientes.module';
import { MascotasModule } from '../mascotas/mascotas.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CitasMedicas]),
        ClientesModule, // Para validar clientes
        MascotasModule, // Para validar mascotas
    ],
    controllers: [CitasMedicasController],
    providers: [CitasMedicasService],
    exports: [CitasMedicasService],
})
export class CitasMedicasModule { }
