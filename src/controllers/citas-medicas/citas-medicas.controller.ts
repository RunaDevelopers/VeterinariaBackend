import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    ParseUUIDPipe,
    Query,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { CitasMedicasService } from 'src/services/citas-medicas/citas-medicas.service';
import { CreateCitaMedicaDto } from 'src/DTO/citas-medicas/create-cita-medica.dto';
import { UpdateCitaMedicaDto } from 'src/DTO/citas-medicas/update-cita-medica.dto';
import { CitasMedicas } from 'src/entities';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';

@ApiTags('Citas Médicas')
@ApiBearerAuth()
@Controller('citas-medicas')
export class CitasMedicasController {
    constructor(private readonly citasMedicasService: CitasMedicasService) { }

    @Post()
    @ApiOperation({
        summary: 'Crear una nueva cita médica',
        description:
            'Registra una nueva cita médica. Valida que la mascota y el cliente existan y estén activos. Previene conflictos de horarios.',
    })
    @ApiResponse({
        status: 201,
        description: 'Cita médica creada exitosamente',
        type: CitasMedicas,
    })
    @ApiResponse({
        status: 404,
        description: 'Mascota o cliente no encontrados',
    })
    @ApiResponse({
        status: 409,
        description: 'Ya existe una cita en ese horario para el veterinario',
    })
    async create(
        @Body() createCitaMedicaDto: CreateCitaMedicaDto,
    ): Promise<BaseResponseDto<CitasMedicas>> {
        return this.citasMedicasService.createCitaMedica(createCitaMedicaDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener todas las citas médicas',
        description: 'Retorna la lista completa de citas médicas con sus relaciones',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de citas médicas obtenida exitosamente',
        type: [CitasMedicas],
    })
    async findAll(): Promise<BaseResponseDto<CitasMedicas[]>> {
        return this.citasMedicasService.getCitasMedicas();
    }

    @Get('cliente/:idCliente')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener citas por cliente',
        description: 'Retorna todas las citas médicas de un cliente específico',
    })
    @ApiParam({
        name: 'idCliente',
        description: 'ID del cliente',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Citas del cliente obtenidas exitosamente',
        type: [CitasMedicas],
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado',
    })
    async findByCliente(
        @Param('idCliente', ParseUUIDPipe) idCliente: string,
    ): Promise<BaseResponseDto<CitasMedicas[]>> {
        return this.citasMedicasService.getCitasByCliente(idCliente);
    }

    @Get('mascota/:idMascota')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener citas por mascota',
        description: 'Retorna todas las citas médicas de una mascota específica',
    })
    @ApiParam({
        name: 'idMascota',
        description: 'ID de la mascota',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Citas de la mascota obtenidas exitosamente',
        type: [CitasMedicas],
    })
    @ApiResponse({
        status: 404,
        description: 'Mascota no encontrada',
    })
    async findByMascota(
        @Param('idMascota', ParseUUIDPipe) idMascota: string,
    ): Promise<BaseResponseDto<CitasMedicas[]>> {
        return this.citasMedicasService.getCitasByMascota(idMascota);
    }

    @Get('veterinario/:idVeterinario')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener citas por veterinario',
        description: 'Retorna todas las citas médicas asignadas a un veterinario',
    })
    @ApiParam({
        name: 'idVeterinario',
        description: 'ID del veterinario',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Citas del veterinario obtenidas exitosamente',
        type: [CitasMedicas],
    })
    async findByVeterinario(
        @Param('idVeterinario', ParseUUIDPipe) idVeterinario: string,
    ): Promise<BaseResponseDto<CitasMedicas[]>> {
        return this.citasMedicasService.getCitasByVeterinario(idVeterinario);
    }

    @Get('estado/:estado')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener citas por estado',
        description:
            'Retorna las citas médicas filtradas por estado (PROGRAMADA, CONFIRMADA, EN_CURSO, COMPLETADA, CANCELADA)',
    })
    @ApiParam({
        name: 'estado',
        description: 'Estado de la cita',
        example: 'PROGRAMADA',
        enum: ['PROGRAMADA', 'CONFIRMADA', 'EN_CURSO', 'COMPLETADA', 'CANCELADA'],
    })
    @ApiResponse({
        status: 200,
        description: 'Citas filtradas por estado obtenidas exitosamente',
        type: [CitasMedicas],
    })
    @ApiResponse({
        status: 400,
        description: 'Estado inválido',
    })
    async findByEstado(
        @Param('estado') estado: string,
    ): Promise<BaseResponseDto<CitasMedicas[]>> {
        return this.citasMedicasService.getCitasByEstado(estado);
    }

    @Get('fecha/:fecha')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener citas por fecha',
        description: 'Retorna todas las citas médicas de una fecha específica',
    })
    @ApiParam({
        name: 'fecha',
        description: 'Fecha de las citas (formato YYYY-MM-DD)',
        example: '2024-11-15',
    })
    @ApiResponse({
        status: 200,
        description: 'Citas de la fecha obtenidas exitosamente',
        type: [CitasMedicas],
    })
    async findByFecha(
        @Param('fecha') fecha: string,
    ): Promise<BaseResponseDto<CitasMedicas[]>> {
        return this.citasMedicasService.getCitasByFecha(fecha);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener una cita médica por ID',
        description: 'Retorna los detalles de una cita médica específica',
    })
    @ApiParam({
        name: 'id',
        description: 'ID de la cita médica',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Cita médica obtenida exitosamente',
        type: CitasMedicas,
    })
    @ApiResponse({
        status: 404,
        description: 'Cita médica no encontrada',
    })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<CitasMedicas>> {
        return this.citasMedicasService.getCitaMedicaById(id);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Actualizar una cita médica',
        description:
            'Actualiza los datos de una cita médica. Valida conflictos de horarios si se cambia la fecha/hora.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID de la cita médica',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Cita médica actualizada exitosamente',
        type: CitasMedicas,
    })
    @ApiResponse({
        status: 404,
        description: 'Cita médica no encontrada',
    })
    @ApiResponse({
        status: 409,
        description: 'Conflicto de horarios',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCitaMedicaDto: UpdateCitaMedicaDto,
    ): Promise<BaseResponseDto<CitasMedicas>> {
        return this.citasMedicasService.updateCitaMedica(id, updateCitaMedicaDto);
    }

    @Patch(':id/cancelar')
    @ApiOperation({
        summary: 'Cancelar una cita médica',
        description:
            'Cancela una cita médica programada o confirmada. No permite cancelar citas completadas.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID de la cita médica',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiQuery({
        name: 'motivo',
        description: 'Motivo de la cancelación',
        required: false,
        example: 'El cliente no puede asistir',
    })
    @ApiResponse({
        status: 200,
        description: 'Cita médica cancelada exitosamente',
        type: CitasMedicas,
    })
    @ApiResponse({
        status: 400,
        description: 'La cita ya está cancelada o completada',
    })
    @ApiResponse({
        status: 404,
        description: 'Cita médica no encontrada',
    })
    async cancelar(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('motivo') motivo?: string,
    ): Promise<BaseResponseDto<CitasMedicas>> {
        return this.citasMedicasService.cancelarCita(id, motivo);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Eliminar una cita médica',
        description: 'Elimina permanentemente una cita médica del sistema',
    })
    @ApiParam({
        name: 'id',
        description: 'ID de la cita médica',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Cita médica eliminada exitosamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Cita médica no encontrada',
    })
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<null>> {
        return this.citasMedicasService.deleteCitaMedica(id);
    }
}
