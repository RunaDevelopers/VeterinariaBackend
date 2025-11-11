import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsUUID } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: '6a6063da-6ec4-403e-988c-05a4af86958b',
    description: 'ID del rol (UUID)',
  })
  @IsUUID('4', { message: 'El ID del rol debe ser un UUID válido' })
  idRol: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombres del usuario',
  })
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombres: string;

  @ApiProperty({
    example: 'Pérez García',
    description: 'Apellidos del usuario',
  })
  @IsString()
  @MinLength(2, { message: 'Los apellidos deben tener al menos 2 caracteres' })
  apellidos: string;

  @ApiProperty({
    example: 'usuario@veterinaria.com',
    description: 'Email del usuario (único)',
  })
  @IsEmail({}, { message: 'El email debe ser válido' })
  email: string;

  @ApiProperty({
    example: 'jperez',
    description: 'Nombre de usuario (único)',
  })
  @IsString()
  @MinLength(4, { message: 'El username debe tener al menos 4 caracteres' })
  username: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({
    example: '+51 987654321',
    description: 'Teléfono del usuario',
  })
  @IsString()
  telefono: string;

  @ApiProperty({
    example: '12345678',
    description: 'Documento de identidad',
    required: false,
  })
  @IsOptional()
  @IsString()
  documentoIdentidad?: string;

  @ApiProperty({
    example: 'DNI',
    description: 'Tipo de documento',
    required: false,
  })
  @IsOptional()
  @IsString()
  tipoDocumento?: string;

  @ApiProperty({
    example: 'Av. Principal 123',
    description: 'Dirección',
    required: false,
  })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({
    example: 'Cardiología',
    description: 'Especialidad (para veterinarios)',
    required: false,
  })
  @IsOptional()
  @IsString()
  especialidad?: string;

  @ApiProperty({
    example: 'MVP-12345',
    description: 'Número de colegiatura',
    required: false,
  })
  @IsOptional()
  @IsString()
  numeroColegiatura?: string;
}
