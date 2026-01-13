import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { UsuariosController } from '../../usuarios/usuarios.controller';
import { Usuarios } from '../../entities/Usuarios';
import { RolesModule } from '../roles/roles.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuarios]),
        RolesModule,
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService],
    exports: [UsuariosService],
})
export class UsuariosModule { }
