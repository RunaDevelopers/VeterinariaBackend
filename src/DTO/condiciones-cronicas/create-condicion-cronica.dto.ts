import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCondicionCronicaDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'Nombre de la condición crónica',
        example: 'Diabetes mellitus',
    })
    @IsString()
    @IsNotEmpty()
    nombreCondicion: string;

    @ApiPropertyOptional({
        description: 'Descripción detallada de la condición',
        example: 'Diabetes tipo 2 controlada con insulina',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({
        description: 'Fecha del diagnóstico',
        example: '2024-01-15',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaDiagnostico: string;

    @ApiPropertyOptional({
        description: 'Nivel de gravedad',
        example: 'Moderada',
        enum: ['Leve', 'Moderada', 'Grave'],
    })
    @IsString()
    @IsOptional()
    gravedad?: string;

    @ApiPropertyOptional({
        description: 'Tratamiento actual',
        example: 'Insulina 10 UI cada 12 horas',
    })
    @IsString()
    @IsOptional()
    tratamientoActual?: string;

    @ApiPropertyOptional({
        description: 'Frecuencia de monitoreo recomendada',
        example: 'Mensual',
    })
    @IsString()
    @IsOptional()
    frecuenciaMonitoreo?: string;

    @ApiPropertyOptional({
        description: 'Estado actual de la condición',
        example: 'Controlada',
        enum: ['Controlada', 'En tratamiento', 'Descontrolada'],
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Requiere dieta especial baja en carbohidratos',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'ID del veterinario que registró la condición',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsOptional()
    idVeterinarioRegistro?: string;
}