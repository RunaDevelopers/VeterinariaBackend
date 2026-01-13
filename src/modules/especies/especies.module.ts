import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspeciesService } from '../../services/especies/especies.service';
import { EspecieController } from '../../controllers/especie/especie.controller';
import { Especies } from '../../entities/Especies';

@Module({
    imports: [TypeOrmModule.forFeature([Especies])],
    controllers: [EspecieController],
    providers: [EspeciesService],
    exports: [EspeciesService],
})
export class EspeciesModule { }
