import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString, IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMascotaDto {
    @ApiProperty({
        description: 'ID del cliente propietario',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idCliente: string;

    @ApiProperty({
        description: 'ID de la especie',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idEspecie: string;

    @ApiProperty({
        description: 'Nombre de la mascota',
        example: 'Max',
    })
    @IsString()
    @IsNotEmpty()
    nombreMascota: string;

    @ApiPropertyOptional({
        description: 'Fecha de nacimiento',
        example: '2020-05-15',
    })
    @IsDateString()
    @IsOptional()
    fechaNacimiento?: string;

    @ApiPropertyOptional({
        description: 'Edad estimada si no se conoce la fecha exacta',
        example: '4 años',
    })
    @IsString()
    @IsOptional()
    edadEstimada?: string;

    @ApiPropertyOptional({
        description: 'Sexo de la mascota (M o H)',
        example: 'M',
        enum: ['M', 'H'],
    })
    @IsString()
    @IsOptional()
    sexo?: string;

    @ApiPropertyOptional({
        description: 'ID de la raza (opcional si no se conoce la raza específica)',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idRaza?: string;

    @ApiPropertyOptional({
        description: 'Color del pelaje',
        example: 'Negro con manchas blancas',
    })
    @IsString()
    @IsOptional()
    color?: string;

    @ApiPropertyOptional({
        description: 'Señas particulares',
        example: 'Mancha en forma de corazón en el lomo',
    })
    @IsString()
    @IsOptional()
    seniasParticulares?: string;

    @ApiPropertyOptional({
        description: 'Número de registro oficial',
        example: 'REG-2024-001234',
    })
    @IsString()
    @IsOptional()
    numeroRegistro?: string;

    @ApiPropertyOptional({
        description: 'Peso actual en kilogramos',
        example: 15.5,
    })
    @Type(() => Number)
    @IsNumber({}, { message: 'El peso debe ser un número' })
    @IsPositive({ message: 'El peso debe ser mayor a 0' })
    @IsOptional()
    pesoActual?: number;

    @ApiPropertyOptional({
        description: 'Indica si está esterilizado',
        example: true,
    })
    @IsBoolean()
    @IsOptional()
    esterilizado?: boolean;

    @ApiPropertyOptional({
        description: 'Fecha de esterilización',
        example: '2021-03-20',
    })
    @IsDateString()
    @IsOptional()
    fechaEsterilizacion?: string;

    @ApiPropertyOptional({
        description: 'Comportamiento de la mascota',
        example: 'Tranquilo y sociable',
    })
    @IsString()
    @IsOptional()
    comportamiento?: string;

    @ApiPropertyOptional({
        description: 'URL de la foto de la mascota',
        example: '/uploads/mascotas/max.jpg',
    })
    @IsString()
    @IsOptional()
    foto?: string;

    @ApiPropertyOptional({
        description: 'Indica si la mascota ha fallecido',
        example: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    fallecido?: boolean;

    @ApiPropertyOptional({
        description: 'Fecha de fallecimiento',
        example: '2024-01-15',
    })
    @IsDateString()
    @IsOptional()
    fechaFallecimiento?: string;

    @ApiPropertyOptional({
        description: 'Causa del fallecimiento',
        example: 'Enfermedad crónica',
    })
    @IsString()
    @IsOptional()
    causaFallecimiento?: string;

    @ApiPropertyOptional({
        description: 'Estado activo de la mascota',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}