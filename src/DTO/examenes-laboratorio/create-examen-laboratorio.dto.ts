import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExamenLaboratorioDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del veterinario que solicita el examen',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idVeterinarioSolicita: string;

    @ApiProperty({
        description: 'Tipo de examen de laboratorio',
        example: 'Hemograma completo',
    })
    @IsString()
    @IsNotEmpty()
    tipoExamen: string;

    @ApiProperty({
        description: 'Fecha de solicitud del examen',
        example: '2024-11-10',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaSolicitud: string;

    @ApiPropertyOptional({
        description: 'Fecha de realización del examen',
        example: '2024-11-12',
    })
    @IsDateString()
    @IsOptional()
    fechaRealizacion?: string;

    @ApiPropertyOptional({
        description: 'Nombre del laboratorio externo',
        example: 'Laboratorio Vet-Lab',
    })
    @IsString()
    @IsOptional()
    laboratorioExterno?: string;

    @ApiPropertyOptional({
        description: 'Resultados del examen',
        example: 'Glóbulos rojos: 6.5 M/uL, Glóbulos blancos: 8.2 K/uL',
    })
    @IsString()
    @IsOptional()
    resultados?: string;

    @ApiPropertyOptional({
        description: 'Valores de referencia',
        example: 'GR: 5.5-8.5 M/uL, GB: 6.0-17.0 K/uL',
    })
    @IsString()
    @IsOptional()
    valorReferencia?: string;

    @ApiPropertyOptional({
        description: 'Interpretación de los resultados',
        example: 'Valores dentro de rangos normales',
    })
    @IsString()
    @IsOptional()
    interpretacion?: string;

    @ApiPropertyOptional({
        description: 'Estado del examen',
        example: 'Completado',
        enum: ['Solicitado', 'En proceso', 'Completado', 'Cancelado'],
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiPropertyOptional({
        description: 'Costo del examen',
        example: 85.50,
    })
    @IsNumber()
    @IsOptional()
    costo?: number;

    @ApiPropertyOptional({
        description: 'URL o ruta del archivo de resultados',
        example: '/uploads/examenes/resultado-001.pdf',
    })
    @IsString()
    @IsOptional()
    archivoResultado?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Se recomienda repetir en 3 meses',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'ID del historial clínico asociado',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idHistorialClinico?: string;
}