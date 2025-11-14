import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from '../../services/leads/leads.service';
import { LeadsController } from '../../controllers/leads/leads.controller';
import { Leads } from '../../entities/Leads';
import { TipoServicios } from '../../entities/TipoServicios';

@Module({
  imports: [TypeOrmModule.forFeature([Leads, TipoServicios])],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService], // Exportar para usar en otros módulos
})
export class LeadsModule {}
