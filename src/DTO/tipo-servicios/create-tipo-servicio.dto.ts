import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsInt,
  MaxLength,
  Min,
  Max,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTipoServicioDto {
  @ApiProperty({
    description: 'Nombre del tipo de servicio',
    example: 'Consulta General',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del servicio es obligatorio' })
  @MaxLength(100, {
    message: 'El nombre del servicio no puede exceder 100 caracteres',
  })
  nombreServicio: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del servicio',
    example: 'Consulta médica veterinaria general para diagnóstico y evaluación',
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiPropertyOptional({
    description: 'Categoría del servicio',
    example: 'Consulta',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50, {
    message: 'La categoría no puede exceder 50 caracteres',
  })
  categoria?: string;

  @ApiPropertyOptional({
    description: 'URL de la foto del servicio',
    example: 'https://example.com/foto.jpg',
  })
  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'La foto debe ser una URL válida' })
  fotoUrl?: string;

  @ApiPropertyOptional({
    description: 'Indica si el servicio requiere cita previa',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  requiereCita?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si requiere la presencia de un veterinario',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  requiereVeterinario?: boolean;

  @ApiPropertyOptional({
    description: 'Duración estimada del servicio en minutos',
    example: 30,
    minimum: 1,
    maximum: 480,
  })
  @IsInt({ message: 'La duración debe ser un número entero' })
  @IsOptional()
  @Min(1, { message: 'La duración mínima es 1 minuto' })
  @Max(480, { message: 'La duración máxima es 480 minutos (8 horas)' })
  duracionEstimadaMinutos?: number;

  @ApiPropertyOptional({
    description: 'Precio base del servicio en soles',
    example: 50.0,
    minimum: 0,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe tener máximo 2 decimales' },
  )
  @IsOptional()
  @Min(0, { message: 'El precio no puede ser negativo' })
  precioBase?: number;

  @ApiPropertyOptional({
    description: 'Estado activo del tipo de servicio',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}