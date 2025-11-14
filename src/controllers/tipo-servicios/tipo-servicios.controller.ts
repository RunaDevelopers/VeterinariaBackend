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
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { TipoServiciosService } from '../../services/tipo-servicios/tipo-servicios.service';
import { CreateTipoServicioDto } from '../../DTO/tipo-servicios/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from '../../DTO/tipo-servicios/update-tipo-servicio.dto';
import { TipoServicios } from '../../entities/TipoServicios';

@ApiTags('Tipo de Servicios')
@ApiBearerAuth()
@Controller('tipo-servicios')
export class TipoServiciosController {
  constructor(private readonly tipoServiciosService: TipoServiciosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo tipo de servicio',
    description:
      'Registra un nuevo tipo de servicio veterinario con todos sus detalles',
  })
  @ApiResponse({
    status: 201,
    description: 'Tipo de servicio creado exitosamente',
    type: TipoServicios,
  })
  @ApiResponse({
    status: 409,
    description: 'El nombre del servicio ya existe',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  async create(
    @Body() createTipoServicioDto: CreateTipoServicioDto,
  ): Promise<TipoServicios> {
    return this.tipoServiciosService.create(createTipoServicioDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todos los tipos de servicios',
    description:
      'Retorna la lista completa de tipos de servicios (activos e inactivos)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de servicios obtenida exitosamente',
    type: [TipoServicios],
  })
  async findAll(): Promise<TipoServicios[]> {
    return this.tipoServiciosService.findAll();
  }

  @Get('activos')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener tipos de servicios activos',
    description: 'Retorna solo los tipos de servicios que están activos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de servicios activos obtenida exitosamente',
    type: [TipoServicios],
  })
  async findAllActive(): Promise<TipoServicios[]> {
    return this.tipoServiciosService.findAllActive();
  }

  @Get('requiere-veterinario')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener servicios que requieren veterinario',
    description:
      'Retorna los tipos de servicios activos que requieren presencia de veterinario',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista obtenida exitosamente',
    type: [TipoServicios],
  })
  async findRequiereVeterinario(): Promise<TipoServicios[]> {
    return this.tipoServiciosService.findRequiereVeterinario();
  }

  @Get('requiere-cita')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener servicios que requieren cita',
    description:
      'Retorna los tipos de servicios activos que requieren cita previa',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista obtenida exitosamente',
    type: [TipoServicios],
  })
  async findRequiereCita(): Promise<TipoServicios[]> {
    return this.tipoServiciosService.findRequiereCita();
  }

  @Get('categoria/:categoria')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener tipos de servicios por categoría',
    description: 'Retorna todos los servicios activos de una categoría específica',
  })
  @ApiParam({
    name: 'categoria',
    description: 'Nombre de la categoría',
    example: 'Consulta',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de servicios obtenida exitosamente',
    type: [TipoServicios],
  })
  async findByCategoria(
    @Param('categoria') categoria: string,
  ): Promise<TipoServicios[]> {
    return this.tipoServiciosService.findByCategoria(categoria);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener un tipo de servicio por ID',
    description:
      'Retorna un tipo de servicio específico con sus relaciones (citas, reservas, servicios realizados)',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del tipo de servicio',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tipo de servicio encontrado',
    type: TipoServicios,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de servicio no encontrado',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TipoServicios> {
    return this.tipoServiciosService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar un tipo de servicio',
    description: 'Actualiza los datos de un tipo de servicio existente',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del tipo de servicio a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tipo de servicio actualizado exitosamente',
    type: TipoServicios,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de servicio no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'El nombre del servicio ya existe',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTipoServicioDto: UpdateTipoServicioDto,
  ): Promise<TipoServicios> {
    return this.tipoServiciosService.update(id, updateTipoServicioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Desactivar un tipo de servicio (eliminación lógica)',
    description:
      'Desactiva un tipo de servicio en lugar de eliminarlo permanentemente',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del tipo de servicio a desactivar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tipo de servicio desactivado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de servicio no encontrado',
  })
  @ApiResponse({
    status: 409,
    description:
      'No se puede eliminar porque tiene registros asociados (citas, reservas o servicios)',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoServiciosService.remove(id);
  }

  @Delete(':id/permanente')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar permanentemente un tipo de servicio',
    description: 'Elimina un tipo de servicio de forma permanente de la base de datos',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del tipo de servicio a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tipo de servicio eliminado permanentemente',
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de servicio no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'No se puede eliminar porque tiene registros asociados',
  })
  async hardDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoServiciosService.hardDelete(id);
  }

  @Patch(':id/activar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reactivar un tipo de servicio desactivado',
    description: 'Activa nuevamente un tipo de servicio que fue desactivado',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del tipo de servicio a activar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Tipo de servicio activado exitosamente',
    type: TipoServicios,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de servicio no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'El tipo de servicio ya está activo',
  })
  async activate(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TipoServicios> {
    return this.tipoServiciosService.activate(id);
  }
}
