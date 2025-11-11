import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecetaMedicaDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del veterinario que prescribe',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idVeterinario: string;

    @ApiProperty({
        description: 'Fecha de emisión de la receta',
        example: '2024-11-10T10:00:00Z',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaReceta: Date;

    @ApiPropertyOptional({
        description: 'Diagnóstico que motivó la receta',
        example: 'Infección respiratoria',
    })
    @IsString()
    @IsOptional()
    diagnostico?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Administrar con alimento',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'Fecha de vigencia de la receta',
        example: '2024-12-10',
    })
    @IsDateString()
    @IsOptional()
    vigenciaHasta?: string;

    @ApiPropertyOptional({
        description: 'ID del cliente',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idCliente?: string;

    @ApiPropertyOptional({
        description: 'ID de la cita asociada',
        example: '123e4567-e89b-12d3-a456-426614174003',
    })
    @IsUUID()
    @IsOptional()
    idCita?: string;
}