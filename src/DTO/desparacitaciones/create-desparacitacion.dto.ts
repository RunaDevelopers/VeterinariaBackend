import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDesparacitacionDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del producto antiparasitario utilizado',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idProducto: string;

    @ApiProperty({
        description: 'Fecha de aplicación',
        example: '2024-11-10',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaAplicacion: string;

    @ApiPropertyOptional({
        description: 'Tipo de parásito',
        example: 'Nematodos',
        enum: ['Nematodos', 'Cestodos', 'Trematodos', 'Mixto'],
    })
    @IsString()
    @IsOptional()
    tipoParasito?: string;

    @ApiPropertyOptional({
        description: 'Vía de administración',
        example: 'Oral',
        enum: ['Oral', 'Tópica', 'Injectable'],
    })
    @IsString()
    @IsOptional()
    viaAdministracion?: string;

    @ApiPropertyOptional({
        description: 'Dosis administrada',
        example: '1 tableta',
    })
    @IsString()
    @IsOptional()
    dosis?: string;

    @ApiPropertyOptional({
        description: 'Peso de la mascota al momento de la aplicación (kg)',
        example: 15.5,
    })
    @IsNumber()
    @IsOptional()
    pesoMascota?: number;

    @ApiPropertyOptional({
        description: 'Fecha de la próxima aplicación',
        example: '2025-02-10',
    })
    @IsDateString()
    @IsOptional()
    proximaAplicacion?: string;

    @ApiPropertyOptional({
        description: 'Lote del producto',
        example: 'LOT-2024-001',
    })
    @IsString()
    @IsOptional()
    lote?: string;

    @ApiPropertyOptional({
        description: 'Observaciones',
        example: 'Mascota toleró bien el medicamento',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'ID del veterinario que aplicó la desparacitación',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idVeterinarioAplica?: string;
}