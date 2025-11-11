import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTipoProductoDto {
    @ApiProperty({
        description: 'Nombre del tipo de producto',
        example: 'Medicamentos',
    })
    @IsString()
    @IsNotEmpty()
    nombreTipo: string;

    @ApiPropertyOptional({
        description: 'Descripción del tipo de producto',
        example: 'Productos farmacéuticos para uso veterinario',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Estado activo del tipo de producto',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}