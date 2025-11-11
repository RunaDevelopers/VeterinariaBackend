import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecetaDetalleDto {
    @ApiProperty({
        description: 'ID de la receta médica',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idReceta: string;

    @ApiProperty({
        description: 'ID del producto/medicamento',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idProducto: string;

    @ApiProperty({
        description: 'Cantidad prescrita',
        example: 2,
    })
    @IsInt()
    @IsNotEmpty()
    cantidad: number;

    @ApiPropertyOptional({
        description: 'Dosis del medicamento',
        example: '500mg',
    })
    @IsString()
    @IsOptional()
    dosis?: string;

    @ApiPropertyOptional({
        description: 'Frecuencia de administración',
        example: 'Cada 12 horas',
    })
    @IsString()
    @IsOptional()
    frecuencia?: string;

    @ApiPropertyOptional({
        description: 'Duración del tratamiento',
        example: '7 días',
    })
    @IsString()
    @IsOptional()
    duracion?: string;

    @ApiPropertyOptional({
        description: 'Vía de administración',
        example: 'Oral',
        enum: ['Oral', 'Tópica', 'Injectable', 'Intravenosa', 'Subcutánea'],
    })
    @IsString()
    @IsOptional()
    viaAdministracion?: string;

    @ApiPropertyOptional({
        description: 'Indicaciones especiales',
        example: 'Administrar con alimento para mejor absorción',
    })
    @IsString()
    @IsOptional()
    indicaciones?: string;
}