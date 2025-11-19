import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservas } from 'src/entities';
import { ReservasService } from 'src/services/reservas/reservas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Reservas])],
    providers: [ReservasService],
    exports: [ReservasService],
})
export class ReservasModule { }
