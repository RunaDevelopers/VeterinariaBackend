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
import { EspeciesService } from 'src/services/especies/especies.service';
import { CreateEspecieDto, UpdateEspecieDto } from 'src/DTO';
import { Especies } from 'src/entities';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';

@ApiTags('Especies')
@ApiBearerAuth()
@Controller('especies')
export class EspecieController {
    constructor(private readonly especiesService: EspeciesService) { }

    @Post()
    @ApiOperation({
        summary: 'Crear una nueva especie',
        description: 'Registra una nueva especie animal en el sistema',
    })
    @ApiResponse({
        status: 201,
        description: 'Especie creada exitosamente',
        type: Especies,
    })
    @ApiResponse({
        status: 409,
        description: 'El nombre de la especie ya existe',
    })
    async create(
        @Body() createEspecieDto: CreateEspecieDto,
    ): Promise<BaseResponseDto<Especies>> {
        return this.especiesService.createEspecie(createEspecieDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener todas las especies',
        description: 'Retorna la lista completa de especies (activas e inactivas) con sus razas',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de especies obtenida exitosamente',
        type: [Especies],
    })
    async findAll(): Promise<BaseResponseDto<Especies[]>> {
        return this.especiesService.getEspecies();
    }

    @Get('activas')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener especies activas',
        description: 'Retorna solo las especies que están activas',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de especies activas obtenida exitosamente',
        type: [Especies],
    })
    async findAllActive(): Promise<BaseResponseDto<Especies[]>> {
        return this.especiesService.getEspeciesActivas();
    }

    @Get('nombre/:nombre')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Buscar especie por nombre',
        description: 'Retorna una especie específica por su nombre exacto',
    })
    @ApiParam({
        name: 'nombre',
        description: 'Nombre de la especie',
        example: 'Canino',
    })
    @ApiResponse({
        status: 200,
        description: 'Especie encontrada',
        type: Especies,
    })
    @ApiResponse({
        status: 404,
        description: 'Especie no encontrada',
    })
    async findByName(
        @Param('nombre') nombre: string,
    ): Promise<BaseResponseDto<Especies>> {
        return this.especiesService.getEspecieByName(nombre);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener una especie por ID',
        description: 'Retorna una especie específica con sus razas y mascotas asociadas',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID de la especie',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Especie encontrada',
        type: Especies,
    })
    @ApiResponse({
        status: 404,
        description: 'Especie no encontrada',
    })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<Especies>> {
        return this.especiesService.getEspecieById(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Actualizar una especie',
        description: 'Actualiza los datos de una especie existente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID de la especie a actualizar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Especie actualizada exitosamente',
        type: Especies,
    })
    @ApiResponse({
        status: 404,
        description: 'Especie no encontrada',
    })
    @ApiResponse({
        status: 409,
        description: 'El nombre de la especie ya existe',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateEspecieDto: UpdateEspecieDto,
    ): Promise<BaseResponseDto<Especies>> {
        return this.especiesService.updateEspecie(id, updateEspecieDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Desactivar una especie (eliminación lógica)',
        description: 'Desactiva una especie en lugar de eliminarla permanentemente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID de la especie a desactivar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Especie desactivada exitosamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Especie no encontrada',
    })
    @ApiResponse({
        status: 400,
        description: 'La especie ya está inactiva',
    })
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<null>> {
        return this.especiesService.deleteEspecie(id);
    }

    @Patch(':id/activar')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Reactivar una especie desactivada',
        description: 'Activa nuevamente una especie que fue desactivada previamente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID de la especie a activar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Especie activada exitosamente',
        type: Especies,
    })
    @ApiResponse({
        status: 404,
        description: 'Especie no encontrada',
    })
    @ApiResponse({
        status: 400,
        description: 'La especie ya está activa',
    })
    async activate(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<Especies>> {
        return this.especiesService.activateEspecie(id);
    }
}
