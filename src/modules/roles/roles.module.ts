import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from '../../services/roles/roles.service';
import { RolesController } from '../../controllers/roles/roles.controller';
import { Roles } from '../../entities/Roles';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService], // Exportar para usar en otros módulos
})
export class RolesModule {}
