import { IsNotEmpty, IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClienteDto {
    @ApiProperty({
        description: 'Nombres del cliente',
        example: 'Juan Carlos',
    })
    @IsString()
    @IsNotEmpty()
    nombres: string;

    @ApiProperty({
        description: 'Apellidos del cliente',
        example: 'Pérez García',
    })
    @IsString()
    @IsNotEmpty()
    apellidos: string;

    @ApiPropertyOptional({
        description: 'Documento de identidad',
        example: '12345678',
    })
    @IsString()
    @IsOptional()
    documentoIdentidad?: string;

    @ApiPropertyOptional({
        description: 'Tipo de documento',
        example: 'DNI',
        enum: ['DNI', 'RUC', 'CE', 'PASAPORTE'],
    })
    @IsString()
    @IsOptional()
    tipoDocumento?: string;

    @ApiPropertyOptional({
        description: 'Correo electrónico del cliente',
        example: 'juan.perez@example.com',
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({
        description: 'Teléfono de contacto',
        example: '+51987654321',
    })
    @IsString()
    @IsNotEmpty()
    telefono: string;

    @ApiPropertyOptional({
        description: 'Dirección del cliente',
        example: 'Av. Principal 123, Dpto 401',
    })
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiPropertyOptional({
        description: 'Ciudad',
        example: 'Lima',
    })
    @IsString()
    @IsOptional()
    ciudad?: string;

    @ApiPropertyOptional({
        description: 'Provincia',
        example: 'Lima',
    })
    @IsString()
    @IsOptional()
    provincia?: string;

    @ApiPropertyOptional({
        description: 'Código postal',
        example: '15001',
    })
    @IsString()
    @IsOptional()
    codigoPostal?: string;

    @ApiPropertyOptional({
        description: 'Ocupación del cliente',
        example: 'Ingeniero',
    })
    @IsString()
    @IsOptional()
    ocupacion?: string;

    @ApiPropertyOptional({
        description: 'Teléfono de emergencia',
        example: '+51912345678',
    })
    @IsString()
    @IsOptional()
    telefonoEmergencia?: string;

    @ApiPropertyOptional({
        description: 'Nombre del contacto de emergencia',
        example: 'María Pérez',
    })
    @IsString()
    @IsOptional()
    contactoEmergencia?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Cliente preferencial',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'Estado activo del cliente',
        example: true,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}