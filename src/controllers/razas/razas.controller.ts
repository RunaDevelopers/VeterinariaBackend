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
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { RazasService } from 'src/services/razas/razas.service';
import { CreateRazaDto, UpdateRazaDto } from 'src/DTO';
import { Razas } from 'src/entities';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';

@ApiTags('Razas')
@ApiBearerAuth()
@Controller('razas')
export class RazasController {
    constructor(private readonly razasService: RazasService) { }

    @Post()
    @ApiOperation({
        summary: 'Crear una nueva raza',
        description: 'Registra una nueva raza asociada a una especie en el sistema',
    })
    @ApiResponse({
        status: 201,
        description: 'Raza creada exitosamente',
        type: Razas,
    })
    @ApiResponse({
        status: 404,
        description: 'Especie no encontrada',
    })
    @ApiResponse({
        status: 409,
        description: 'La raza ya existe para esa especie',
    })
    async create(
        @Body() createRazaDto: CreateRazaDto,
    ): Promise<BaseResponseDto<Razas>> {
        return this.razasService.createRaza(createRazaDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener todas las razas',
        description: 'Retorna la lista completa de razas (activas e inactivas) con sus especies',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de razas obtenida exitosamente',
        type: [Razas],
    })
    async findAll(): Promise<BaseResponseDto<Razas[]>> {
        return this.razasService.getRazas();
    }

    @Get('activas')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener razas activas',
        description: 'Retorna solo las razas que están activas',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de razas activas obtenida exitosamente',
        type: [Razas],
    })
    async findAllActive(): Promise<BaseResponseDto<Razas[]>> {
        return this.razasService.getRazasActivas();
    }

    @Get('especie/:idEspecie')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener razas por especie',
        description: 'Retorna todas las razas activas de una especie específica',
    })
    @ApiParam({
        name: 'idEspecie',
        description: 'UUID de la especie',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Razas de la especie obtenidas exitosamente',
        type: [Razas],
    })
    @ApiResponse({
        status: 404,
        description: 'Especie no encontrada',
    })
    async findByEspecie(
        @Param('idEspecie', ParseUUIDPipe) idEspecie: string,
    ): Promise<BaseResponseDto<Razas[]>> {
        return this.razasService.getRazasByEspecie(idEspecie);
    }

    @Get('nombre/:nombre')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Buscar raza por nombre',
        description: 'Retorna una raza específica por su nombre exacto',
    })
    @ApiParam({
        name: 'nombre',
        description: 'Nombre de la raza',
        example: 'Labrador Retriever',
    })
    @ApiResponse({
        status: 200,
        description: 'Raza encontrada',
        type: Razas,
    })
    @ApiResponse({
        status: 404,
        description: 'Raza no encontrada',
    })
    async findByName(
        @Param('nombre') nombre: string,
    ): Promise<BaseResponseDto<Razas>> {
        return this.razasService.getRazaByName(nombre);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener una raza por ID',
        description: 'Retorna una raza específica con su especie y mascotas asociadas',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID de la raza',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Raza encontrada',
        type: Razas,
    })
    @ApiResponse({
        status: 404,
        description: 'Raza no encontrada',
    })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<Razas>> {
        return this.razasService.getRazaById(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Actualizar una raza',
        description: 'Actualiza los datos de una raza existente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID de la raza a actualizar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Raza actualizada exitosamente',
        type: Razas,
    })
    @ApiResponse({
        status: 404,
        description: 'Raza no encontrada',
    })
    @ApiResponse({
        status: 409,
        description: 'El nombre de la raza ya existe para esa especie',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateRazaDto: UpdateRazaDto,
    ): Promise<BaseResponseDto<Razas>> {
        return this.razasService.updateRaza(id, updateRazaDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Desactivar una raza (eliminación lógica)',
        description: 'Desactiva una raza en lugar de eliminarla permanentemente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID de la raza a desactivar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Raza desactivada exitosamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Raza no encontrada',
    })
    @ApiResponse({
        status: 400,
        description: 'La raza ya está inactiva',
    })
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<null>> {
        return this.razasService.deleteRaza(id);
    }

    @Patch(':id/activar')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Reactivar una raza desactivada',
        description: 'Activa nuevamente una raza que fue desactivada previamente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID de la raza a activar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Raza activada exitosamente',
        type: Razas,
    })
    @ApiResponse({
        status: 404,
        description: 'Raza no encontrada',
    })
    @ApiResponse({
        status: 400,
        description: 'La raza ya está activa',
    })
    async activate(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<Razas>> {
        return this.razasService.activateRaza(id);
    }
}
