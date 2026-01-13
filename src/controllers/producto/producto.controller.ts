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
import { ProductosService } from 'src/services/productos/productos.service';
import { CreateProductoDto } from 'src/DTO';
import { Productos } from 'src/entities';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';

@ApiTags('Productos')
@ApiBearerAuth()
@Controller('productos')
export class ProductoController {
    constructor(private readonly productosService: ProductosService) { }

    @Post()
    @ApiOperation({
        summary: 'Crear un nuevo producto',
        description: 'Registra un nuevo producto en el sistema con sus datos completos',
    })
    @ApiResponse({
        status: 201,
        description: 'Producto creado exitosamente',
        type: Productos,
    })
    @ApiResponse({
        status: 404,
        description: 'Tipo de producto no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'El nombre o código del producto ya existe',
    })
    async create(
        @Body() createProductoDto: CreateProductoDto,
    ): Promise<BaseResponseDto<Productos>> {
        return this.productosService.createProducto(createProductoDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener todos los productos',
        description: 'Retorna la lista completa de productos (activos e inactivos)',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de productos obtenida exitosamente',
        type: [Productos],
    })
    async findAll(): Promise<BaseResponseDto<Productos[]>> {
        return this.productosService.getProductos();
    }

    @Get('activos')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener productos activos',
        description: 'Retorna solo los productos que están activos',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de productos activos obtenida exitosamente',
        type: [Productos],
    })
    async findAllActive(): Promise<BaseResponseDto<Productos[]>> {
        return this.productosService.getProductosActivos();
    }

    @Get('nombre/:nombre')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Buscar producto por nombre',
        description: 'Retorna un producto específico por su nombre exacto',
    })
    @ApiParam({
        name: 'nombre',
        description: 'Nombre del producto',
        example: 'Amoxicilina 500mg',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto encontrado',
        type: Productos,
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado',
    })
    async findByName(
        @Param('nombre') nombre: string,
    ): Promise<BaseResponseDto<Productos>> {
        return this.productosService.getProductoByName(nombre);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Actualizar un producto',
        description: 'Actualiza los datos de un producto existente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del producto a actualizar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto actualizado exitosamente',
        type: Productos,
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'El nombre o código del producto ya existe',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProductoDto: CreateProductoDto,
    ): Promise<BaseResponseDto<Productos | null>> {
        return this.productosService.updateProducto(id, updateProductoDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Desactivar un producto (eliminación lógica)',
        description:
            'Desactiva un producto en lugar de eliminarlo permanentemente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del producto a desactivar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto desactivado exitosamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado',
    })
    @ApiResponse({
        status: 400,
        description: 'El producto ya está inactivo',
    })
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<null>> {
        return this.productosService.deleteLogicalProducto(id);
    }

    @Patch(':id/activar')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Reactivar un producto desactivado',
        description:
            'Activa nuevamente un producto que fue desactivado previamente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del producto a activar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto activado exitosamente',
        type: Productos,
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado',
    })
    @ApiResponse({
        status: 400,
        description: 'El producto ya está activo',
    })
    async activate(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<Productos>> {
        return this.productosService.activateProducto(id);
    }

    @Delete(':id/permanente')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Eliminar permanentemente un producto',
        description:
            'Elimina un producto de forma permanente de la base de datos',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del producto a eliminar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto eliminado permanentemente',
    })
    @ApiResponse({
        status: 404,
        description: 'Producto no encontrado',
    })
    async hardDelete(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<null>> {
        return this.productosService.hardDeleteProducto(id);
    }
}
