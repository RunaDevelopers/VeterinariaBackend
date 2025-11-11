import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCirugiaDto {
    @ApiProperty({
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID()
    @IsNotEmpty()
    idMascota: string;

    @ApiProperty({
        description: 'ID del veterinario que realizó la cirugía',
        example: '123e4567-e89b-12d3-a456-426614174001',
    })
    @IsUUID()
    @IsNotEmpty()
    idVeterinario: string;

    @ApiProperty({
        description: 'Tipo de cirugía realizada',
        example: 'Esterilización',
    })
    @IsString()
    @IsNotEmpty()
    tipoCirugia: string;

    @ApiPropertyOptional({
        description: 'Clasificación de la cirugía',
        example: 'Electiva',
    })
    @IsString()
    @IsOptional()
    clasificacion?: string;

    @ApiProperty({
        description: 'Fecha en que se realizó la cirugía',
        example: '2024-11-10T10:00:00Z',
    })
    @IsDateString()
    @IsNotEmpty()
    fechaCirugia: Date;

    @ApiPropertyOptional({
        description: 'Duración de la cirugía en minutos',
        example: 120,
    })
    @IsInt()
    @IsOptional()
    duracionMinutos?: number;

    @ApiPropertyOptional({
        description: 'Equipo de apoyo que participó',
        example: 'Dr. Juan Pérez, Enfermera María López',
    })
    @IsString()
    @IsOptional()
    equipoApoyo?: string;

    @ApiPropertyOptional({
        description: 'Diagnóstico preoperatorio',
        example: 'Tumor abdominal',
    })
    @IsString()
    @IsOptional()
    diagnosticoPreoperatorio?: string;

    @ApiPropertyOptional({
        description: 'Exámenes preoperatorios realizados',
        example: 'Hemograma completo, radiografía',
    })
    @IsString()
    @IsOptional()
    examenesPreoperatorios?: string;

    @ApiPropertyOptional({
        description: 'Nivel de riesgo anestésico',
        example: 'Bajo',
    })
    @IsString()
    @IsOptional()
    riesgoAnestesico?: string;

    @ApiPropertyOptional({
        description: 'Tipo de anestesia utilizada',
        example: 'General inhalatoria',
    })
    @IsString()
    @IsOptional()
    tipoAnestesia?: string;

    @ApiPropertyOptional({
        description: 'Protocolo anestésico utilizado',
        example: 'Inducción con propofol, mantenimiento con isoflurano',
    })
    @IsString()
    @IsOptional()
    protocolo?: string;

    @ApiPropertyOptional({
        description: 'Descripción detallada del procedimiento',
        example: 'Incisión en línea media, extracción de útero y ovarios',
    })
    @IsString()
    @IsOptional()
    descripcionProcedimiento?: string;

    @ApiPropertyOptional({
        description: 'Hallazgos durante la cirugía',
        example: 'Útero aumentado de tamaño',
    })
    @IsString()
    @IsOptional()
    hallazgosIntraoperatorios?: string;

    @ApiPropertyOptional({
        description: 'Complicaciones durante la cirugía',
        example: 'Ninguna',
    })
    @IsString()
    @IsOptional()
    complicacionesIntraoperatorias?: string;

    @ApiPropertyOptional({
        description: 'Materiales utilizados en la cirugía',
        example: 'Suturas absorbibles 3-0, gasas, compresas',
    })
    @IsString()
    @IsOptional()
    materialesUtilizados?: string;

    @ApiPropertyOptional({
        description: 'Tipo de suturas utilizadas',
        example: 'Sutura simple interrumpida',
    })
    @IsString()
    @IsOptional()
    suturas?: string;

    @ApiPropertyOptional({
        description: 'Cuidados postoperatorios recomendados',
        example: 'Reposo 7 días, antibióticos, analgésicos',
    })
    @IsString()
    @IsOptional()
    cuidadosPostoperatorios?: string;

    @ApiPropertyOptional({
        description: 'Pronóstico del paciente',
        example: 'Favorable',
    })
    @IsString()
    @IsOptional()
    pronóstico?: string;

    @ApiPropertyOptional({
        description: 'Observaciones adicionales',
        example: 'Paciente se recuperó sin complicaciones',
    })
    @IsString()
    @IsOptional()
    observaciones?: string;

    @ApiPropertyOptional({
        description: 'ID del historial clínico asociado',
        example: '123e4567-e89b-12d3-a456-426614174002',
    })
    @IsUUID()
    @IsOptional()
    idHistorialClinico?: string;

    @ApiPropertyOptional({
        description: 'ID del servicio realizado asociado',
        example: '123e4567-e89b-12d3-a456-426614174003',
    })
    @IsUUID()
    @IsOptional()
    idServicioRealizado?: string;
}
