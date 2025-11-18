import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoServiciosService } from '../../services/tipo-servicios/tipo-servicios.service';
import { TipoServiciosController } from '../../controllers/tipo-servicios/tipo-servicios.controller';
import { TipoServicios } from '../../entities/TipoServicios';

@Module({
  imports: [TypeOrmModule.forFeature([TipoServicios])],
  controllers: [TipoServiciosController],
  providers: [TipoServiciosService],
  exports: [TipoServiciosService], // Exportar para usar en otros módulos (ej: leads, citas)
})
export class TipoServiciosModule {}
