import { IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean, IsNumber, IsPositive, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateRazaDto {
    @ApiProperty({
        description: 'ID de la especie a la que pertenece',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idEspecie: string;

    @ApiProperty({
        description: 'Nombre de la raza',
        example: 'Labrador Retriever',
    })
    @IsString()
    @IsNotEmpty()
    nombreRaza: string;

    @ApiPropertyOptional({
        description: 'Tamaño de la raza',
        example: 'Grande',
        enum: ['Muy pequeño', 'Pequeño', 'Mediano', 'Grande', 'Muy grande'],
    })
    @IsString()
    @IsOptional()
    tamanio?: string;

    @ApiPropertyOptional({
        description: 'Características de la raza',
        example: 'Raza de perro grande, amigable y activa. Excelente para familias.',
    })
    @IsString()
    @IsOptional()
    caracteristicas?: string;

    @ApiPropertyOptional({
        description: 'Peso promedio mínimo en kg',
        example: 25.5,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'El peso mínimo debe ser un número' })
    @IsPositive({ message: 'El peso mínimo debe ser mayor a 0' })
    @IsOptional()
    pesoPromedioMin?: number;

    @ApiPropertyOptional({
        description: 'Peso promedio máximo en kg',
        example: 36.0,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'El peso máximo debe ser un número' })
    @IsPositive({ message: 'El peso máximo debe ser mayor a 0' })
    @IsOptional()
    pesoPromedioMax?: number;

    @ApiPropertyOptional({
        description: 'Esperanza de vida en años',
        example: 12,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'La esperanza de vida debe ser un número' })
    @Min(1, { message: 'La esperanza de vida debe ser al menos 1 año' })
    @IsOptional()
    esperanzaVidaAnios?: number;

    @ApiPropertyOptional({
        description: 'Estado activo de la raza',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}