import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVacunacionDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del producto (vacuna)',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idProducto: string;

    @ApiProperty({
        description: 'Nombre de la vacuna',
        example: 'Antirrábica',
    })
    @IsString()
    @IsNotEmpty()
    nombreVacuna: string;

    @ApiProperty({
        description: 'Fecha de aplicación',
        example: '2024-11-10',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaAplicacion: string;

    @ApiPropertyOptional({
        description: 'Fecha de la próxima aplicación',
        example: '2025-11-10',
    })
    @IsDateString()
    @IsOptional()
    proximaAplicacion?: string;

    @ApiPropertyOptional({
        description: 'Lote de la vacuna',
        example: 'LOT-VAC-2024-001',
    })
    @IsString()
    @IsOptional()
    lote?: string;

    @ApiPropertyOptional({
        description: 'Vía de administración',
        example: 'Subcutánea',
        enum: ['Subcutánea', 'Intramuscular', 'Intranasal', 'Oral'],
    })
    @IsString()
    @IsOptional()
    viaAdministracion?: string;

    @ApiPropertyOptional({
        description: 'Dosis aplicada',
        example: '1 ml',
    })
    @IsString()
    @IsOptional()
    dosis?: string;

    @ApiPropertyOptional({
        description: 'Peso de la mascota al momento de la vacunación (kg)',
        example: 15.5,
    })
    @IsNumber()
    @IsOptional()
    pesoMascota?: number;

    @ApiPropertyOptional({
        description: 'Observaciones sobre la vacunación',
        example: 'Mascota toleró bien la vacuna',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'ID del veterinario que aplicó la vacuna',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idVeterinarioAplica?: string;
}