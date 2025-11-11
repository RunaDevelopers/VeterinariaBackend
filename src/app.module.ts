// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        
        // Solo sincronizar en desarrollo (¡cuidado en producción!)
        synchronize: configService.get('NODE_ENV') === 'development',
        
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
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}