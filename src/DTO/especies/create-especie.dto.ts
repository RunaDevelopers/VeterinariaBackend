import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEspecieDto {
    @ApiProperty({
        description: 'Nombre de la especie',
        example: 'Canino',
    })
    @IsString()
    @IsNotEmpty()
    nombreEspecie: string;

    @ApiPropertyOptional({
        description: 'Nombre científico de la especie',
        example: 'Canis lupus familiaris',
    })
    @IsString()
    @IsOptional()
    nombreCientifico?: string;

    @ApiPropertyOptional({
        description: 'Descripción de la especie',
        example: 'Perros domésticos',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Estado activo de la especie',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}