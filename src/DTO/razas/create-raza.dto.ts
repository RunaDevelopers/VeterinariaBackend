import { IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
        description: 'Descripción de la raza',
        example: 'Raza de perro grande, amigable y activa',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Estado activo de la raza',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}