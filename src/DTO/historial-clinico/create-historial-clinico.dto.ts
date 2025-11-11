import { IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHistorialClinicoDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del veterinario que atiende',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idVeterinario: string;

    @ApiProperty({
        description: 'Fecha de la consulta',
        example: '2024-11-10T10:00:00Z',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaConsulta: Date;

    @ApiPropertyOptional({
        description: 'Motivo de la consulta',
        example: 'Revisión general y vacunación',
    })
    @IsString()
    @IsOptional()
    motivoConsulta?: string;

    @ApiPropertyOptional({
        description: 'Anamnesis (historial del paciente)',
        example: 'Propietario reporta apetito normal, sin vómitos ni diarreas',
    })
    @IsString()
    @IsOptional()
    anamnesis?: string;

    @ApiPropertyOptional({
        description: 'Temperatura corporal (°C)',
        example: 38.5,
    })
    @IsNumber()
    @IsOptional()
    temperatura?: number;

    @ApiPropertyOptional({
        description: 'Peso de la mascota (kg)',
        example: 15.5,
    })
    @IsNumber()
    @IsOptional()
    peso?: number;

    @ApiPropertyOptional({
        description: 'Frecuencia cardíaca (latidos por minuto)',
        example: 110,
    })
    @IsNumber()
    @IsOptional()
    frecuenciaCardiaca?: number;

    @ApiPropertyOptional({
        description: 'Frecuencia respiratoria (respiraciones por minuto)',
        example: 25,
    })
    @IsNumber()
    @IsOptional()
    frecuenciaRespiratoria?: number;

    @ApiPropertyOptional({
        description: 'Condición corporal',
        example: 'Ideal',
        enum: ['Delgado', 'Ideal', 'Sobrepeso', 'Obeso'],
    })
    @IsString()
    @IsOptional()
    condicionCorporal?: string;

    @ApiPropertyOptional({
        description: 'Estado de hidratación',
        example: 'Normal',
        enum: ['Deshidratado', 'Normal', 'Sobrehidratado'],
    })
    @IsString()
    @IsOptional()
    estadoHidratacion?: string;

    @ApiPropertyOptional({
        description: 'Estado de las mucosas',
        example: 'Rosadas y húmedas',
    })
    @IsString()
    @IsOptional()
    mucosas?: string;

    @ApiPropertyOptional({
        description: 'Resultados del examen físico',
        example: 'Sin hallazgos anormales',
    })
    @IsString()
    @IsOptional()
    examenFisico?: string;

    @ApiPropertyOptional({
        description: 'Diagnóstico presuntivo',
        example: 'Animal sano',
    })
    @IsString()
    @IsOptional()
    diagnosticoPresuntivo?: string;

    @ApiPropertyOptional({
        description: 'Diagnóstico definitivo',
        example: 'Estado de salud óptimo',
    })
    @IsString()
    @IsOptional()
    diagnosticoDefinitivo?: string;

    @ApiPropertyOptional({
        description: 'Tratamiento prescrito',
        example: 'Vacunación antirrábica y óctuple',
    })
    @IsString()
    @IsOptional()
    tratamiento?: string;

    @ApiPropertyOptional({
        description: 'Procedimientos realizados',
        example: 'Vacunación, desparasitación',
    })
    @IsString()
    @IsOptional()
    procedimientosRealizados?: string;

    @ApiPropertyOptional({
        description: 'Exámenes complementarios solicitados',
        example: 'Ninguno',
    })
    @IsString()
    @IsOptional()
    examenesComplementarios?: string;

    @ApiPropertyOptional({
        description: 'Pronóstico',
        example: 'Excelente',
        enum: ['Excelente', 'Bueno', 'Reservado', 'Grave'],
    })
    @IsString()
    @IsOptional()
    pronóstico?: string;

    @ApiPropertyOptional({
        description: 'Recomendaciones para el propietario',
        example: 'Mantener dieta balanceada y ejercicio regular',
    })
    @IsString()
    @IsOptional()
    recomendaciones?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Propietario muy comprometido con el cuidado',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'Fecha de la próxima revisión',
        example: '2025-11-10',
    })
    @IsDateString()
    @IsOptional()
    proximaRevision?: string;

    @ApiPropertyOptional({
        description: 'ID de la cita asociada',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idCita?: string;
}