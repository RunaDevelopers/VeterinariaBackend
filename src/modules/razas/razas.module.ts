import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazasService } from '../../services/razas/razas.service';
import { RazasController } from '../../controllers/razas/razas.controller';
import { Razas } from '../../entities/Razas';
import { EspeciesModule } from '../especies/especies.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Razas]),
        EspeciesModule, // Para EspeciesService
    ],
    controllers: [RazasController],
    providers: [RazasService],
    exports: [RazasService],
})
export class RazasModule { }
