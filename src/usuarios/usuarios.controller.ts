import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { CreateUsuarioDto } from '../DTO/usuarios/create-usuario.dto';
import { UpdateUsuarioDto } from '../DTO/usuarios/update-usuario.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Rol no encontrado o datos inválidos' })
    @ApiResponse({ status: 409, description: 'Email, username o documento ya registrado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuariosService.createUsuario(createUsuarioDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Usuarios obtenidos exitosamente' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findAll() {
        return this.usuariosService.getUsuarios();
    }

    @Get('activos')
    @ApiOperation({ summary: 'Obtener todos los usuarios activos' })
    @ApiResponse({ status: 200, description: 'Usuarios activos obtenidos exitosamente' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findActivos() {
        return this.usuariosService.getUsuariosActivos();
    }

    @Get('rol/:idRol')
    @ApiOperation({ summary: 'Obtener usuarios por rol' })
    @ApiParam({ name: 'idRol', description: 'ID del rol', type: 'string' })
    @ApiResponse({ status: 200, description: 'Usuarios del rol obtenidos exitosamente' })
    @ApiResponse({ status: 404, description: 'Rol no encontrado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findByRol(@Param('idRol', ParseUUIDPipe) idRol: string) {
        return this.usuariosService.getUsuariosByRol(idRol);
    }

    @Get('email/:email')
    @ApiOperation({ summary: 'Obtener usuario por email' })
    @ApiParam({ name: 'email', description: 'Email del usuario', type: 'string' })
    @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findByEmail(@Param('email') email: string) {
        return this.usuariosService.getUsuarioByEmail(email);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string' })
    @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.usuariosService.getUsuarioById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un usuario' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 400, description: 'Rol no encontrado o datos inválidos' })
    @ApiResponse({ status: 409, description: 'Email, username o documento ya registrado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateUsuarioDto: UpdateUsuarioDto,
    ) {
        return this.usuariosService.updateUsuario(id, updateUsuarioDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Desactivar un usuario (eliminación lógica)' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string' })
    @ApiResponse({ status: 200, description: 'Usuario desactivado exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 400, description: 'El usuario ya está inactivo' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.usuariosService.deleteUsuario(id);
    }

    @Patch(':id/activar')
    @ApiOperation({ summary: 'Activar un usuario' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string' })
    @ApiResponse({ status: 200, description: 'Usuario activado exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 400, description: 'El usuario ya está activo' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    activate(@Param('id', ParseUUIDPipe) id: string) {
        return this.usuariosService.activateUsuario(id);
    }

    @Post(':id/cambiar-password')
    @ApiOperation({ summary: 'Cambiar contraseña del usuario' })
    @ApiParam({ name: 'id', description: 'ID del usuario', type: 'string' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                currentPassword: { type: 'string', example: 'OldP@ssw0rd123' },
                newPassword: { type: 'string', example: 'NewP@ssw0rd123' },
            },
            required: ['currentPassword', 'newPassword'],
        },
    })
    @ApiResponse({ status: 200, description: 'Contraseña cambiada exitosamente' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    @ApiResponse({ status: 401, description: 'Contraseña actual incorrecta' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    cambiarPassword(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('currentPassword') currentPassword: string,
        @Body('newPassword') newPassword: string,
    ) {
        return this.usuariosService.cambiarPassword(id, currentPassword, newPassword);
    }
}
