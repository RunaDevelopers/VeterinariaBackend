import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCitaMedicaDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del veterinario asignado',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idVeterinario: string;

    @ApiProperty({
        description: 'Fecha de la cita',
        example: '2024-11-15',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaCita: string;

    @ApiProperty({
        description: 'Hora de inicio de la cita',
        example: '10:00:00',
    })
    @IsString()
    @IsNotEmpty()
    horaInicio: string;

    @ApiPropertyOptional({
        description: 'Hora de finalización de la cita',
        example: '11:00:00',
    })
    @IsString()
    @IsOptional()
    horaFin?: string;

    @ApiPropertyOptional({
        description: 'Estado de la cita',
        example: 'PROGRAMADA',
        enum: ['PROGRAMADA', 'CONFIRMADA', 'EN_CURSO', 'COMPLETADA', 'CANCELADA'],
    })
    @IsString()
    @IsOptional()
    estado?: string;

    @ApiPropertyOptional({
        description: 'Motivo de la consulta',
        example: 'Vacunación anual',
    })
    @IsString()
    @IsOptional()
    motivoConsulta?: string;

    @ApiPropertyOptional({
        description: 'Prioridad de la cita',
        example: 'NORMAL',
        enum: ['BAJA', 'NORMAL', 'ALTA', 'URGENTE'],
    })
    @IsString()
    @IsOptional()
    prioridad?: string;

    @ApiPropertyOptional({
        description: 'Notas de preparación para la cita',
        example: 'Traer cartilla de vacunación',
    })
    @IsString()
    @IsOptional()
    notasPreparacion?: string;

    @ApiPropertyOptional({
        description: 'ID del cliente',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idCliente?: string;

    @ApiPropertyOptional({
        description: 'ID de la reserva asociada',
        example: '123e4567-e89b-12d3-a456-426614174003',
    })
    @IsUUID()
    @IsOptional()
    idReserva?: string;

    @ApiPropertyOptional({
        description: 'ID del tipo de servicio',
        example: '123e4567-e89b-12d3-a456-426614174004',
    })
    @IsUUID()
    @IsOptional()
    idTipoServicio?: string;
}