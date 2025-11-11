import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServicioRealizadoDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del tipo de servicio',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idTipoServicio: string;

    @ApiProperty({
        description: 'ID del veterinario que realizó el servicio',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsNotEmpty()
    idVeterinario: string;

    @ApiProperty({
        description: 'Fecha del servicio',
        example: '2024-11-10T10:00:00Z',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaServicio: Date;

    @ApiPropertyOptional({
        description: 'Descripción del servicio realizado',
        example: 'Vacunación antirrábica y revisión general',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Costo del servicio',
        example: 75.50,
    })
    @IsNumber()
    @IsOptional()
    costo?: number;

    @ApiPropertyOptional({
        description: 'Estado del servicio',
        example: 'Completado',
        enum: ['Pendiente', 'En proceso', 'Completado', 'Cancelado'],
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Mascota cooperó durante el procedimiento',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'ID del cliente',
        example: '123e4567-e89b-12d3-a456-426614174003',
    })
    @IsUUID()
    @IsOptional()
    idCliente?: string;

    @ApiPropertyOptional({
        description: 'ID de la cita asociada',
        example: '123e4567-e89b-12d3-a456-426614174004',
    })
    @IsUUID()
    @IsOptional()
    idCita?: string;
}