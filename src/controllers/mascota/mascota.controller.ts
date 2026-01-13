import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { MascotasService } from '../../services/mascotas/mascotas.service';
import { CreateMascotaDto } from '../../DTO/mascotas/create-mascota.dto';
import { UpdateMascotaDto } from '../../DTO/mascotas/update-mascota.dto';

@ApiTags('Mascotas')
@Controller('mascotas')
export class MascotaController {
    constructor(private readonly mascotasService: MascotasService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear una nueva mascota' })
    @ApiResponse({ status: 201, description: 'Mascota creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos o relaciones no encontradas' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    create(@Body() createMascotaDto: CreateMascotaDto) {
        return this.mascotasService.createMascota(createMascotaDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las mascotas' })
    @ApiResponse({ status: 200, description: 'Mascotas obtenidas exitosamente' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findAll() {
        return this.mascotasService.getMascotas();
    }

    @Get('activas')
    @ApiOperation({ summary: 'Obtener todas las mascotas activas' })
    @ApiResponse({ status: 200, description: 'Mascotas activas obtenidas exitosamente' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findActivas() {
        return this.mascotasService.getMascotasActivas();
    }

    @Get('cliente/:idCliente')
    @ApiOperation({ summary: 'Obtener mascotas por cliente' })
    @ApiParam({ name: 'idCliente', description: 'ID del cliente', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mascotas del cliente obtenidas exitosamente' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findByCliente(@Param('idCliente', ParseUUIDPipe) idCliente: string) {
        return this.mascotasService.getMascotasByCliente(idCliente);
    }

    @Get('especie/:idEspecie')
    @ApiOperation({ summary: 'Obtener mascotas por especie' })
    @ApiParam({ name: 'idEspecie', description: 'ID de la especie', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mascotas de la especie obtenidas exitosamente' })
    @ApiResponse({ status: 404, description: 'Especie no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findByEspecie(@Param('idEspecie', ParseUUIDPipe) idEspecie: string) {
        return this.mascotasService.getMascotasByEspecie(idEspecie);
    }

    @Get('raza/:idRaza')
    @ApiOperation({ summary: 'Obtener mascotas por raza' })
    @ApiParam({ name: 'idRaza', description: 'ID de la raza', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mascotas de la raza obtenidas exitosamente' })
    @ApiResponse({ status: 404, description: 'Raza no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findByRaza(@Param('idRaza', ParseUUIDPipe) idRaza: string) {
        return this.mascotasService.getMascotasByRaza(idRaza);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una mascota por ID' })
    @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mascota obtenida exitosamente' })
    @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.mascotasService.getMascotaById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una mascota' })
    @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mascota actualizada exitosamente' })
    @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
    @ApiResponse({ status: 400, description: 'Datos inválidos o relaciones no encontradas' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateMascotaDto: UpdateMascotaDto,
    ) {
        return this.mascotasService.updateMascota(id, updateMascotaDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Desactivar una mascota (eliminación lógica)' })
    @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mascota desactivada exitosamente' })
    @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
    @ApiResponse({ status: 400, description: 'La mascota ya está inactiva' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.mascotasService.deleteMascota(id);
    }

    @Patch(':id/activar')
    @ApiOperation({ summary: 'Activar una mascota' })
    @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string' })
    @ApiResponse({ status: 200, description: 'Mascota activada exitosamente' })
    @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
    @ApiResponse({ status: 400, description: 'La mascota ya está activa' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    activate(@Param('id', ParseUUIDPipe) id: string) {
        return this.mascotasService.activateMascota(id);
    }

    @Post(':id/fallecimiento')
    @ApiOperation({ summary: 'Registrar fallecimiento de una mascota' })
    @ApiParam({ name: 'id', description: 'ID de la mascota', type: 'string' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                fechaFallecimiento: { type: 'string', format: 'date', example: '2024-01-15' },
                causaFallecimiento: { type: 'string', example: 'Enfermedad crónica' },
            },
            required: ['fechaFallecimiento'],
        },
    })
    @ApiResponse({ status: 200, description: 'Fallecimiento registrado exitosamente' })
    @ApiResponse({ status: 404, description: 'Mascota no encontrada' })
    @ApiResponse({ status: 400, description: 'La mascota ya está registrada como fallecida' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    registrarFallecimiento(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('fechaFallecimiento') fechaFallecimiento: string,
        @Body('causaFallecimiento') causaFallecimiento?: string,
    ) {
        return this.mascotasService.registrarFallecimiento(id, fechaFallecimiento, causaFallecimiento);
    }
}
