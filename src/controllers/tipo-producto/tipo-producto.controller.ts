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
import { TipoProductoService } from '../../services/tipo-producto/tipo-producto.service';
import { CreateTipoProductoDto } from 'src/DTO';
import { TipoProducto } from 'src/entities';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';

@ApiTags('Tipo de Productos')
@ApiBearerAuth()
@Controller('tipo-producto')
export class TipoProductoController {
    constructor(private readonly tipoProductoService: TipoProductoService) { }

    @Post()
    @ApiOperation({
        summary: 'Crear un nuevo tipo de producto',
        description: 'Registra un nuevo tipo de producto en el sistema',
    })
    @ApiResponse({
        status: 201,
        description: 'Tipo de producto creado exitosamente',
        type: TipoProducto,
    })
    @ApiResponse({
        status: 409,
        description: 'El nombre del tipo de producto ya existe',
    })
    async create(
        @Body() createTipoProductoDto: CreateTipoProductoDto,
    ): Promise<BaseResponseDto<TipoProducto>> {
        return this.tipoProductoService.createTipoProducto(createTipoProductoDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener todos los tipos de producto',
        description:
            'Retorna la lista completa de tipos de producto (activos e inactivos)',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de tipos de producto obtenida exitosamente',
        type: [TipoProducto],
    })
    async findAll(): Promise<BaseResponseDto<TipoProducto[]>> {
        return this.tipoProductoService.getTipoProductos();
    }

    @Get('activos')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener tipos de producto activos',
        description: 'Retorna solo los tipos de producto que están activos',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de tipos de producto activos obtenida exitosamente',
        type: [TipoProducto],
    })
    async findAllActive(): Promise<BaseResponseDto<TipoProducto[]>> {
        return this.tipoProductoService.getTipoProductosActivos();
    }

    @Get('nombre/:nombre')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Buscar tipo de producto por nombre',
        description: 'Retorna un tipo de producto específico por su nombre',
    })
    @ApiParam({
        name: 'nombre',
        description: 'Nombre del tipo de producto',
        example: 'Medicamentos',
    })
    @ApiResponse({
        status: 200,
        description: 'Tipo de producto encontrado',
        type: TipoProducto,
    })
    @ApiResponse({
        status: 404,
        description: 'Tipo de producto no encontrado',
    })
    async findByName(
        @Param('nombre') nombre: string,
    ): Promise<BaseResponseDto<TipoProducto>> {
        return this.tipoProductoService.getTipoProductoByName(nombre);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener un tipo de producto por ID',
        description:
            'Retorna un tipo de producto específico con sus productos asociados',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del tipo de producto',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Tipo de producto encontrado',
        type: TipoProducto,
    })
    @ApiResponse({
        status: 404,
        description: 'Tipo de producto no encontrado',
    })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<TipoProducto>> {
        return this.tipoProductoService.getTipoProductoById(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Actualizar un tipo de producto',
        description: 'Actualiza los datos de un tipo de producto existente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del tipo de producto a actualizar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Tipo de producto actualizado exitosamente',
        type: TipoProducto,
    })
    @ApiResponse({
        status: 404,
        description: 'Tipo de producto no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'El nombre del tipo de producto ya existe',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTipoProductoDto: CreateTipoProductoDto,
    ): Promise<BaseResponseDto<TipoProducto>> {
        return this.tipoProductoService.updateTipoProducto(
            id,
            updateTipoProductoDto,
        );
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Desactivar un tipo de producto (eliminación lógica)',
        description:
            'Desactiva un tipo de producto en lugar de eliminarlo permanentemente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del tipo de producto a desactivar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Tipo de producto desactivado exitosamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Tipo de producto no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'No se puede eliminar porque tiene productos asociados',
    })
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<null>> {
        return this.tipoProductoService.deleteTipoProducto(id);
    }

    @Patch(':id/activar')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Reactivar un tipo de producto desactivado',
        description:
            'Activa nuevamente un tipo de producto que fue desactivado previamente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del tipo de producto a activar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Tipo de producto activado exitosamente',
        type: TipoProducto,
    })
    @ApiResponse({
        status: 404,
        description: 'Tipo de producto no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'El tipo de producto ya está activo',
    })
    async activate(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<TipoProducto>> {
        return this.tipoProductoService.activateTipoProducto(id);
    }

    @Delete(':id/permanente')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Eliminar permanentemente un tipo de producto',
        description:
            'Elimina un tipo de producto de forma permanente de la base de datos',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del tipo de producto a eliminar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Tipo de producto eliminado permanentemente',
    })
    @ApiResponse({
        status: 404,
        description: 'Tipo de producto no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'No se puede eliminar porque tiene productos asociados',
    })
    async hardDelete(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<null>> {
        return this.tipoProductoService.hardDeleteTipoProducto(id);
    }
}
