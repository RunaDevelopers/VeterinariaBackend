import { IsNotEmpty, IsOptional, IsString, IsNumber, IsBoolean, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTipoServicioDto {
    @ApiProperty({
        description: 'Nombre del tipo de servicio',
        example: 'Consulta General',
    })
    @IsString()
    @IsNotEmpty()
    nombreServicio: string;

    @ApiPropertyOptional({
        description: 'Descripción del servicio',
        example: 'Consulta médica veterinaria general',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Precio base del servicio',
        example: 50.00,
    })
    @IsNumber()
    @IsOptional()
    precioBase?: number;

    @ApiPropertyOptional({
        description: 'Duración estimada en minutos',
        example: 30,
    })
    @IsInt()
    @IsOptional()
    duracionEstimada?: number;

    @ApiPropertyOptional({
        description: 'Indica si requiere un veterinario',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    requiereVeterinario?: boolean;

    @ApiPropertyOptional({
        description: 'Estado activo del tipo de servicio',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}