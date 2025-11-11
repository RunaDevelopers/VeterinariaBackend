import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuditoriaDto {
    @ApiProperty({
        description: 'Nombre de la tabla afectada',
        example: 'usuarios',
    })
    @IsString()
    @IsNotEmpty()
    nombreTabla: string;

    @ApiProperty({
        description: 'Tipo de operación realizada',
        example: 'INSERT',
        enum: ['INSERT', 'UPDATE', 'DELETE'],
    })
    @IsString()
    @IsNotEmpty()
    operacion: string;

    @ApiPropertyOptional({
        description: 'ID del registro afectado',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsString()
    @IsOptional()
    registroId?: string;

    @ApiPropertyOptional({
        description: 'Datos anteriores (JSON)',
        example: '{"nombre": "Juan", "edad": 30}',
    })
    @IsString()
    @IsOptional()
    datosAnteriores?: string;

    @ApiPropertyOptional({
        description: 'Datos nuevos (JSON)',
        example: '{"nombre": "Juan", "edad": 31}',
    })
    @IsString()
    @IsOptional()
    datosNuevos?: string;

    @ApiPropertyOptional({
        description: 'ID del usuario que realizó la operación',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsOptional()
    idUsuario?: string;

    @ApiPropertyOptional({
        description: 'Dirección IP desde donde se realizó la operación',
        example: '192.168.1.100',
    })
    @IsString()
    @IsOptional()
    ipAddress?: string;
}