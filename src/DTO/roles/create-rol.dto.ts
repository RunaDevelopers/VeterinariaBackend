import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRolDto {
    @ApiProperty({
        description: 'Nombre del rol',
        example: 'Veterinario',
    })
    @IsString()
    @IsNotEmpty()
    nombreRol: string;

    @ApiPropertyOptional({
        description: 'Descripción del rol',
        example: 'Usuario con permisos para gestión médica',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Estado activo del rol',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}