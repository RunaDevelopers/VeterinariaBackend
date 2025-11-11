// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AlergiasMascotasService } from './services/alergias-mascotas/alergias-mascotas.service';
import { AuditoriaService } from './services/auditoria/auditoria.service';
import { CirugiasService } from './services/cirugias/cirugias.service';
import { CitasMedicasService } from './services/citas-medicas/citas-medicas.service';
import { ClientesService } from './services/clientes/clientes.service';
import { CondicionesCronicasService } from './services/condiciones-cronicas/condiciones-cronicas.service';
import { DesparacitacionesService } from './services/desparacitaciones/desparacitaciones.service';
import { EspeciesService } from './services/especies/especies.service';
import { ExamenesLaboratorioService } from './services/examenes-laboratorio/examenes-laboratorio.service';
import { HistorialClinicoService } from './services/historial-clinico/historial-clinico.service';
import { MascotasService } from './services/mascotas/mascotas.service';
import { ProductosService } from './services/productos/productos.service';
import { RazasService } from './services/razas/razas.service';
import { RecetaDetalleService } from './services/receta-detalle/receta-detalle.service';
import { RecetasMedicasService } from './services/recetas-medicas/recetas-medicas.service';
import { ReservasService } from './services/reservas/reservas.service';
import { RolesService } from './services/roles/roles.service';
import { ServicioProductosService } from './services/servicio-productos/servicio-productos.service';
import { ServiciosRealizadosService } from './services/servicios-realizados/servicios-realizados.service';
import { TipoProductoService } from './services/tipo-producto/tipo-producto.service';
import { TipoServiciosService } from './services/tipo-servicios/tipo-servicios.service';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { VacunacionesService } from './services/vacunaciones/vacunaciones.service';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    // 1. Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // 2. Configuración de TypeORM con Supabase
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        
        // Carpeta donde estarán tus entidades
        entities: [
          __dirname + '/**/*.entity{.ts,.js}',  // Entidades de auth/
          __dirname + '/entities/**/*.{ts,js}',  // Entidades de entities/
        ],
        
        // Solo sincronizar en desarrollo (¡cuidado en producción!)
        synchronize: false, // DESACTIVADO para no alterar las tablas de Supabase
        
        // Migraciones automáticas desactivadas
        migrationsRun: false,
        
        // SSL requerido por Supabase
        ssl: {
          rejectUnauthorized: false,
        },
        
        // Logging para ver las consultas SQL (útil para debugging)
        logging: true,
      }),
    }),

    // 3. Módulo de autenticación
    AuthModule,

    // 4. Módulo de roles
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AlergiasMascotasService, AuditoriaService, CirugiasService, CitasMedicasService, ClientesService, CondicionesCronicasService, DesparacitacionesService, EspeciesService, ExamenesLaboratorioService, HistorialClinicoService, MascotasService, ProductosService, RazasService, RecetaDetalleService, RecetasMedicasService, ReservasService, RolesService, ServicioProductosService, ServiciosRealizadosService, TipoProductoService, TipoServiciosService, UsuariosService, VacunacionesService, ],
})
export class AppModule {}