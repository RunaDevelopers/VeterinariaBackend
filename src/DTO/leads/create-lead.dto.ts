import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsUUID,
  IsOptional,
  IsDateString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({
    description: 'Nombres del lead',
    example: 'Juan Carlos',
    maxLength: 225,
  })
  @IsString()
  @IsNotEmpty({ message: 'Los nombres son obligatorios' })
  @MaxLength(225, { message: 'Los nombres no pueden exceder 225 caracteres' })
  nombres: string;

  @ApiProperty({
    description: 'Apellidos del lead',
    example: 'García Pérez',
    maxLength: 225,
  })
  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @MaxLength(225, { message: 'Los apellidos no pueden exceder 225 caracteres' })
  apellidos: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '+51987654321',
    maxLength: 225,
  })
  @IsString()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @MinLength(9, { message: 'El teléfono debe tener al menos 9 caracteres' })
  @MaxLength(225, { message: 'El teléfono no puede exceder 225 caracteres' })
  @Matches(/^[\d\+\-\(\)\s]+$/, {
    message: 'El teléfono solo puede contener números, +, -, (, ) y espacios',
  })
  telefono: string;

  @ApiProperty({
    description: 'Correo electrónico del lead',
    example: 'juan.garcia@example.com',
    maxLength: 225,
  })
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @MaxLength(225, {
    message: 'El correo electrónico no puede exceder 225 caracteres',
  })
  correo: string;

  @ApiProperty({
    description: 'Fecha tentativa para el servicio (formato: YYYY-MM-DD)',
    example: '2025-11-20',
    required: false,
  })
  @IsOptional()
  @IsDateString(
    {},
    { message: 'La fecha tentativa debe estar en formato YYYY-MM-DD' },
  )
  fechaTentativa?: string;

  @ApiProperty({
    description: 'UUID del tipo de servicio solicitado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'El ID del tipo de servicio debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El tipo de servicio es obligatorio' })
  idTipoServicios: string;
}
