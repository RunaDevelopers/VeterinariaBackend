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
import { ClientesService } from 'src/services/clientes/clientes.service';
import { CreateClienteDto } from 'src/DTO';
import { Clientes } from 'src/entities';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';

@ApiTags('Clientes')
@ApiBearerAuth()
@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) { }

    @Post()
    @ApiOperation({
        summary: 'Registrar un nuevo cliente',
        description: 'Crea un nuevo cliente en el sistema con sus datos personales',
    })
    @ApiResponse({
        status: 201,
        description: 'Cliente registrado exitosamente',
        type: Clientes,
    })
    @ApiResponse({
        status: 409,
        description: 'El documento de identidad ya está registrado',
    })
    async create(
        @Body() createClienteDto: CreateClienteDto,
    ): Promise<BaseResponseDto<Clientes>> {
        return this.clientesService.registrarCliente(createClienteDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener todos los clientes',
        description: 'Retorna la lista completa de clientes (activos e inactivos) con sus mascotas',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de clientes obtenida exitosamente',
        type: [Clientes],
    })
    async findAll(): Promise<BaseResponseDto<Clientes[]>> {
        return this.clientesService.buscarCliente();
    }

    @Get('activos')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener clientes activos',
        description: 'Retorna solo los clientes que están activos',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de clientes activos obtenida exitosamente',
        type: [Clientes],
    })
    async findAllActive(): Promise<BaseResponseDto<Clientes[]>> {
        return this.clientesService.buscarClienteActivos();
    }

    @Get('dni/:dni')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Buscar cliente por documento de identidad',
        description: 'Retorna un cliente específico por su documento de identidad',
    })
    @ApiParam({
        name: 'dni',
        description: 'Documento de identidad del cliente',
        example: '12345678',
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente encontrado',
        type: Clientes,
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado',
    })
    async findByDni(
        @Param('dni') dni: string,
    ): Promise<BaseResponseDto<Clientes>> {
        return this.clientesService.buscarClientePorDni(dni);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Obtener un cliente por ID',
        description: 'Retorna un cliente específico con sus mascotas asociadas',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del cliente',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente encontrado',
        type: Clientes,
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado',
    })
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<Clientes>> {
        return this.clientesService.buscarClientePorId(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Actualizar un cliente',
        description: 'Actualiza los datos de un cliente existente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del cliente a actualizar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente actualizado exitosamente',
        type: Clientes,
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado',
    })
    @ApiResponse({
        status: 409,
        description: 'El documento de identidad ya está registrado para otro cliente',
    })
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateClienteDto: CreateClienteDto,
    ): Promise<BaseResponseDto<Clientes>> {
        return this.clientesService.actualizarCliente(id, updateClienteDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Desactivar un cliente (eliminación lógica)',
        description: 'Desactiva un cliente en lugar de eliminarlo permanentemente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del cliente a desactivar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente desactivado exitosamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado',
    })
    @ApiResponse({
        status: 400,
        description: 'El cliente ya está inactivo',
    })
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<null>> {
        return this.clientesService.eliminarClienteLogico(id);
    }

    @Patch(':id/activar')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Reactivar un cliente desactivado',
        description: 'Activa nuevamente un cliente que fue desactivado previamente',
    })
    @ApiParam({
        name: 'id',
        description: 'UUID del cliente a activar',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @ApiResponse({
        status: 200,
        description: 'Cliente activado exitosamente',
        type: Clientes,
    })
    @ApiResponse({
        status: 404,
        description: 'Cliente no encontrado',
    })
    @ApiResponse({
        status: 400,
        description: 'El cliente ya está activo',
    })
    async activate(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<BaseResponseDto<Clientes>> {
        return this.clientesService.activarCliente(id);
    }
}
