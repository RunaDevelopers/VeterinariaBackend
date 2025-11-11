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
import { RolesService } from '../../services/roles/roles.service';
import { CreateRolDto } from '../../DTO/roles/create-rol.dto';
import { UpdateRolDto } from '../../DTO/roles/update-rol.dto';
import { Roles } from '../../entities/Roles';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear un nuevo rol',
    description: 'Crea un nuevo rol en el sistema',
  })
  @ApiResponse({
    status: 201,
    description: 'Rol creado exitosamente',
    type: Roles,
  })
  @ApiResponse({
    status: 409,
    description: 'El rol ya existe',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  async create(@Body() createRolDto: CreateRolDto): Promise<Roles> {
    return this.rolesService.create(createRolDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener todos los roles',
    description: 'Retorna la lista completa de roles (activos e inactivos)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles obtenida exitosamente',
    type: [Roles],
  })
  async findAll(): Promise<Roles[]> {
    return this.rolesService.findAll();
  }

  @Get('activos')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener roles activos',
    description: 'Retorna solo los roles que están activos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles activos obtenida exitosamente',
    type: [Roles],
  })
  async findAllActive(): Promise<Roles[]> {
    return this.rolesService.findAllActive();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener un rol por ID',
    description: 'Retorna un rol específico con sus usuarios relacionados',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del rol',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Rol encontrado',
    type: Roles,
  })
  @ApiResponse({
    status: 404,
    description: 'Rol no encontrado',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Roles> {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar un rol',
    description: 'Actualiza los datos de un rol existente',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del rol a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Rol actualizado exitosamente',
    type: Roles,
  })
  @ApiResponse({
    status: 404,
    description: 'Rol no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'El nombre del rol ya existe',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRolDto: UpdateRolDto,
  ): Promise<Roles> {
    return this.rolesService.update(id, updateRolDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Desactivar un rol (eliminación lógica)',
    description: 'Desactiva un rol en lugar de eliminarlo permanentemente',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del rol a desactivar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Rol desactivado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Rol no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'No se puede eliminar el rol porque tiene usuarios asignados',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.remove(id);
  }

  @Delete(':id/permanente')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar permanentemente un rol',
    description: 'Elimina un rol de forma permanente de la base de datos',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del rol a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Rol eliminado permanentemente',
  })
  @ApiResponse({
    status: 404,
    description: 'Rol no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'No se puede eliminar el rol porque tiene usuarios asignados',
  })
  async hardDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.rolesService.hardDelete(id);
  }

  @Patch(':id/activar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reactivar un rol desactivado',
    description: 'Activa nuevamente un rol que fue desactivado',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del rol a activar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Rol activado exitosamente',
    type: Roles,
  })
  @ApiResponse({
    status: 404,
    description: 'Rol no encontrado',
  })
  @ApiResponse({
    status: 409,
    description: 'El rol ya está activo',
  })
  async activate(@Param('id', ParseUUIDPipe) id: string): Promise<Roles> {
    return this.rolesService.activate(id);
  }
}
