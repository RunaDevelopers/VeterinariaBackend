import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAlergiaMascotaDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del producto relacionado con la alergia',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idProducto: string;

    @ApiProperty({
        description: 'Tipo de alergia',
        example: 'Medicamento',
    })
    @IsString()
    @IsNotEmpty()
    tipoAlergia: string;

    @ApiPropertyOptional({
        description: 'Descripción detallada de la alergia',
        example: 'Alergia a la penicilina',
    })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({
        description: 'Nivel de gravedad de la alergia',
        example: 'Alta',
    })
    @IsString()
    @IsOptional()
    gravedad?: string;

    @ApiPropertyOptional({
        description: 'Reacción observada',
        example: 'Urticaria y dificultad respiratoria',
    })
    @IsString()
    @IsOptional()
    reaccionObservada?: string;

    @ApiPropertyOptional({
        description: 'ID del veterinario que registró la alergia',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idVeterinarioRegistro?: string;
}