import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEmail, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty({
        description: 'ID del rol del usuario',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idRol: string;

    @ApiProperty({
        description: 'Nombres del usuario',
        example: 'Carlos Alberto',
    })
    @IsString()
    @IsNotEmpty()
    nombres: string;

    @ApiProperty({
        description: 'Apellidos del usuario',
        example: 'Rodríguez Sánchez',
    })
    @IsString()
    @IsNotEmpty()
    apellidos: string;

    @ApiProperty({
        description: 'Correo electrónico (único)',
        example: 'carlos.rodriguez@veterinaria.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Nombre de usuario (único)',
        example: 'crodriguez',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'SecureP@ssw0rd123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'Teléfono de contacto',
        example: '+51987654321',
    })
    @IsString()
    @IsNotEmpty()
    telefono: string;

    @ApiPropertyOptional({
        description: 'Documento de identidad (único)',
        example: '12345678',
    })
    @IsString()
    @IsOptional()
    documentoIdentidad?: string;

    @ApiPropertyOptional({
        description: 'Tipo de documento',
        example: 'DNI',
    })
    @IsString()
    @IsOptional()
    tipoDocumento?: string;

    @ApiPropertyOptional({
        description: 'Dirección',
        example: 'Av. Principal 456',
    })
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiPropertyOptional({
        description: 'Especialidad (para veterinarios)',
        example: 'Medicina General',
    })
    @IsString()
    @IsOptional()
    especialidad?: string;

    @ApiPropertyOptional({
        description: 'Número de colegiatura (para veterinarios)',
        example: 'MVP-12345',
    })
    @IsString()
    @IsOptional()
    numeroColegiatura?: string;

    @ApiPropertyOptional({
        description: 'URL de la foto del usuario',
        example: '/uploads/usuarios/carlos.jpg',
    })
    @IsString()
    @IsOptional()
    foto?: string;

    @ApiPropertyOptional({
        description: 'Estado activo del usuario',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}