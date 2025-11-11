import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReservaDto {
    @ApiProperty({
        description: 'ID del cliente que realiza la reserva',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idCliente: string;

    @ApiProperty({
        description: 'ID del tipo de servicio',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idTipoServicio: string;

    @ApiProperty({
        description: 'Fecha de la reserva',
        example: '2024-11-15',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaReserva: string;

    @ApiProperty({
        description: 'Hora de inicio',
        example: '14:00:00',
    })
    @IsString()
    @IsNotEmpty()
    horaInicio: string;

    @ApiPropertyOptional({
        description: 'Hora de finalización',
        example: '15:00:00',
    })
    @IsString()
    @IsOptional()
    horaFin?: string;

    @ApiPropertyOptional({
        description: 'Estado de la reserva',
        example: 'Pendiente',
        enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'],
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiPropertyOptional({
        description: 'Observaciones de la reserva',
        example: 'Primera visita',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idMascota?: string;

    @ApiPropertyOptional({
        description: 'ID del veterinario asignado',
        example: '123e4567-e89b-12d3-a456-426614174003',
    })
    @IsUUID()
    @IsOptional()
    idVeterinarioAsignado?: string;
}