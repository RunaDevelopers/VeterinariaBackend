import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
        description: 'Sexo de la mascota',
        example: 'Macho',
        enum: ['Macho', 'Hembra'],
    })
    @IsString()
    @IsOptional()
    sexo?: string;

    @ApiPropertyOptional({
        description: 'ID de la raza',
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
    señasParticulares?: string;

    @ApiPropertyOptional({
        description: 'Peso en kilogramos',
        example: 15.5,
    })
    @IsNumber()
    @IsOptional()
    peso?: number;

    @ApiPropertyOptional({
        description: 'Tamaño de la mascota',
        example: 'Mediano',
        enum: ['Pequeño', 'Mediano', 'Grande', 'Gigante'],
    })
    @IsString()
    @IsOptional()
    tamaño?: string;

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
        description: 'Número de microchip',
        example: '985112345678901',
    })
    @IsString()
    @IsOptional()
    numeroMicrochip?: string;

    @ApiPropertyOptional({
        description: 'Número de registro oficial',
        example: 'REG-2024-001234',
    })
    @IsString()
    @IsOptional()
    numeroRegistro?: string;

    @ApiPropertyOptional({
        description: 'Compañía de seguro médico',
        example: 'PetSafe Insurance',
    })
    @IsString()
    @IsOptional()
    seguroMedico?: string;

    @ApiPropertyOptional({
        description: 'Número de póliza del seguro',
        example: 'POL-123456789',
    })
    @IsString()
    @IsOptional()
    numeroPoliza?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Mascota muy sociable con otros animales',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'URL de la foto de la mascota',
        example: '/uploads/mascotas/max.jpg',
    })
    @IsString()
    @IsOptional()
    foto?: string;

    @ApiPropertyOptional({
        description: 'Estado activo de la mascota',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}