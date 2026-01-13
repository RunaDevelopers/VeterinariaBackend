import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuarios } from '../../entities/Usuarios';
import { BaseResponseDto } from '../../DTO/baseResponse/baseResponse.dto';
import { CreateUsuarioDto } from '../../DTO/usuarios/create-usuario.dto';
import { UpdateUsuarioDto } from '../../DTO/usuarios/update-usuario.dto';
import { IUsuarioService } from '../../interfaces/usuario.interface';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsuariosService implements IUsuarioService {
    constructor(
        @InjectRepository(Usuarios)
        private readonly usuariosRepository: Repository<Usuarios>,
        private readonly rolesService: RolesService,
    ) { }

    async getUsuarios(): Promise<BaseResponseDto<Usuarios[]>> {
        try {
            const usuarios = await this.usuariosRepository.find({
                relations: ['idRol2'],
                select: {
                    idUsuario: true,
                    idRol: true,
                    nombres: true,
                    apellidos: true,
                    email: true,
                    telefono: true,
                    username: true,
                    documentoIdentidad: true,
                    tipoDocumento: true,
                    direccion: true,
                    especialidad: true,
                    numeroColegiatura: true,
                    activo: true,
                    ultimoAcceso: true,
                    fechaCreacion: true,
                    fechaModificacion: true,
                    // NO incluir passwordHash
                },
            });

            return new BaseResponseDto<Usuarios[]>(
                true,
                'Usuarios obtenidos exitosamente',
                usuarios,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios[]>(
                false,
                'Error al obtener los usuarios',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getUsuariosActivos(): Promise<BaseResponseDto<Usuarios[]>> {
        try {
            const usuarios = await this.usuariosRepository.find({
                where: { activo: true },
                relations: ['idRol2'],
                select: {
                    idUsuario: true,
                    idRol: true,
                    nombres: true,
                    apellidos: true,
                    email: true,
                    telefono: true,
                    username: true,
                    documentoIdentidad: true,
                    tipoDocumento: true,
                    direccion: true,
                    especialidad: true,
                    numeroColegiatura: true,
                    activo: true,
                    ultimoAcceso: true,
                    fechaCreacion: true,
                    fechaModificacion: true,
                },
            });

            return new BaseResponseDto<Usuarios[]>(
                true,
                'Usuarios activos obtenidos exitosamente',
                usuarios,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios[]>(
                false,
                'Error al obtener los usuarios activos',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getUsuarioById(id: string): Promise<BaseResponseDto<Usuarios>> {
        try {
            const usuario = await this.usuariosRepository.findOne({
                where: { idUsuario: id },
                relations: ['idRol2'],
                select: {
                    idUsuario: true,
                    idRol: true,
                    nombres: true,
                    apellidos: true,
                    email: true,
                    telefono: true,
                    username: true,
                    documentoIdentidad: true,
                    tipoDocumento: true,
                    direccion: true,
                    especialidad: true,
                    numeroColegiatura: true,
                    activo: true,
                    ultimoAcceso: true,
                    fechaCreacion: true,
                    fechaModificacion: true,
                },
            });

            if (!usuario) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Usuario no encontrado',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Usuarios>(
                true,
                'Usuario obtenido exitosamente',
                usuario,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios>(
                false,
                'Error al obtener el usuario',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getUsuarioByEmail(email: string): Promise<BaseResponseDto<Usuarios>> {
        try {
            const usuario = await this.usuariosRepository.findOne({
                where: { email },
                relations: ['idRol2'],
                select: {
                    idUsuario: true,
                    idRol: true,
                    nombres: true,
                    apellidos: true,
                    email: true,
                    telefono: true,
                    username: true,
                    documentoIdentidad: true,
                    tipoDocumento: true,
                    direccion: true,
                    especialidad: true,
                    numeroColegiatura: true,
                    activo: true,
                    ultimoAcceso: true,
                    fechaCreacion: true,
                    fechaModificacion: true,
                },
            });

            if (!usuario) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Usuario no encontrado',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Usuarios>(
                true,
                'Usuario obtenido exitosamente',
                usuario,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios>(
                false,
                'Error al obtener el usuario',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getUsuariosByRol(idRol: string): Promise<BaseResponseDto<Usuarios[]>> {
        try {
            // Validar que el rol exista y esté activo
            const rol = await this.rolesService.findOne(idRol);
            if (!rol || !rol.activo) {
                return new BaseResponseDto<Usuarios[]>(
                    false,
                    'Rol no encontrado o inactivo',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            const usuarios = await this.usuariosRepository.find({
                where: { idRol, activo: true },
                relations: ['idRol2'],
                select: {
                    idUsuario: true,
                    idRol: true,
                    nombres: true,
                    apellidos: true,
                    email: true,
                    telefono: true,
                    username: true,
                    documentoIdentidad: true,
                    tipoDocumento: true,
                    direccion: true,
                    especialidad: true,
                    numeroColegiatura: true,
                    activo: true,
                    ultimoAcceso: true,
                    fechaCreacion: true,
                    fechaModificacion: true,
                },
            });

            return new BaseResponseDto<Usuarios[]>(
                true,
                'Usuarios del rol obtenidos exitosamente',
                usuarios,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios[]>(
                false,
                'Error al obtener los usuarios del rol',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<BaseResponseDto<Usuarios>> {
        try {
            // Validar que el rol exista y esté activo
            const rol = await this.rolesService.findOne(createUsuarioDto.idRol);
            if (!rol || !rol.activo) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Rol no encontrado o inactivo',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Verificar si el email ya existe
            const existingEmail = await this.usuariosRepository.findOne({
                where: { email: createUsuarioDto.email },
            });

            if (existingEmail) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'El email ya está registrado',
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            // Verificar si el username ya existe
            const existingUsername = await this.usuariosRepository.findOne({
                where: { username: createUsuarioDto.username },
            });

            if (existingUsername) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'El username ya está registrado',
                    undefined,
                    null,
                    HttpStatus.CONFLICT,
                );
            }

            // Si se proporciona documento, verificar que no exista
            if (createUsuarioDto.documentoIdentidad) {
                const existingDoc = await this.usuariosRepository.findOne({
                    where: { documentoIdentidad: createUsuarioDto.documentoIdentidad },
                });

                if (existingDoc) {
                    return new BaseResponseDto<Usuarios>(
                        false,
                        'El documento de identidad ya está registrado',
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

            const { password, ...userData } = createUsuarioDto;

            const nuevoUsuario = this.usuariosRepository.create({
                ...userData,
                passwordHash: hashedPassword,
            });

            const saved = await this.usuariosRepository.save(nuevoUsuario);
            const usuarioGuardado = Array.isArray(saved) ? saved[0] : saved;

            // Obtener el usuario con sus relaciones (sin password)
            const usuarioCompleto = await this.usuariosRepository.findOne({
                where: { idUsuario: usuarioGuardado.idUsuario },
                relations: ['idRol2'],
                select: {
                    idUsuario: true,
                    idRol: true,
                    nombres: true,
                    apellidos: true,
                    email: true,
                    telefono: true,
                    username: true,
                    documentoIdentidad: true,
                    tipoDocumento: true,
                    direccion: true,
                    especialidad: true,
                    numeroColegiatura: true,
                    activo: true,
                    ultimoAcceso: true,
                    fechaCreacion: true,
                    fechaModificacion: true,
                },
            });

            if (!usuarioCompleto) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Error al recuperar el usuario creado',
                    undefined,
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            return new BaseResponseDto<Usuarios>(
                true,
                'Usuario creado exitosamente',
                usuarioCompleto,
                null,
                HttpStatus.CREATED,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios>(
                false,
                'Error al crear el usuario',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateUsuario(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<BaseResponseDto<Usuarios>> {
        try {
            // Verificar que el usuario existe
            const usuario = await this.usuariosRepository.findOne({
                where: { idUsuario: id },
            });

            if (!usuario) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Usuario no encontrado',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            // Si se actualiza el rol, validar que exista y esté activo
            if (updateUsuarioDto.idRol) {
                const rol = await this.rolesService.findOne(updateUsuarioDto.idRol);
                if (!rol || !rol.activo) {
                    return new BaseResponseDto<Usuarios>(
                        false,
                        'Rol no encontrado o inactivo',
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            // Si se actualiza el email, verificar que no exista (excepto el actual)
            if (updateUsuarioDto.email && updateUsuarioDto.email !== usuario.email) {
                const existingEmail = await this.usuariosRepository.findOne({
                    where: { email: updateUsuarioDto.email },
                });

                if (existingEmail) {
                    return new BaseResponseDto<Usuarios>(
                        false,
                        'El email ya está registrado',
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            // Si se actualiza el username, verificar que no exista (excepto el actual)
            if (updateUsuarioDto.username && updateUsuarioDto.username !== usuario.username) {
                const existingUsername = await this.usuariosRepository.findOne({
                    where: { username: updateUsuarioDto.username },
                });

                if (existingUsername) {
                    return new BaseResponseDto<Usuarios>(
                        false,
                        'El username ya está registrado',
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            // Si se actualiza el documento, verificar que no exista (excepto el actual)
            if (updateUsuarioDto.documentoIdentidad && updateUsuarioDto.documentoIdentidad !== usuario.documentoIdentidad) {
                const existingDoc = await this.usuariosRepository.findOne({
                    where: { documentoIdentidad: updateUsuarioDto.documentoIdentidad },
                });

                if (existingDoc) {
                    return new BaseResponseDto<Usuarios>(
                        false,
                        'El documento de identidad ya está registrado',
                        undefined,
                        null,
                        HttpStatus.CONFLICT,
                    );
                }
            }

            // Si se proporciona nueva contraseña, hashearla
            let dataToUpdate: any = { ...updateUsuarioDto };
            if (updateUsuarioDto.password) {
                const hashedPassword = await bcrypt.hash(updateUsuarioDto.password, 10);
                delete dataToUpdate.password;
                dataToUpdate.passwordHash = hashedPassword;
            }

            const usuarioActualizado = this.usuariosRepository.merge(usuario, dataToUpdate);
            await this.usuariosRepository.save(usuarioActualizado);

            // Obtener el usuario actualizado con relaciones (sin password)
            const usuarioCompleto = await this.usuariosRepository.findOne({
                where: { idUsuario: id },
                relations: ['idRol2'],
                select: {
                    idUsuario: true,
                    idRol: true,
                    nombres: true,
                    apellidos: true,
                    email: true,
                    telefono: true,
                    username: true,
                    documentoIdentidad: true,
                    tipoDocumento: true,
                    direccion: true,
                    especialidad: true,
                    numeroColegiatura: true,
                    activo: true,
                    ultimoAcceso: true,
                    fechaCreacion: true,
                    fechaModificacion: true,
                },
            });

            if (!usuarioCompleto) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Error al recuperar el usuario actualizado',
                    undefined,
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            return new BaseResponseDto<Usuarios>(
                true,
                'Usuario actualizado exitosamente',
                usuarioCompleto,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios>(
                false,
                'Error al actualizar el usuario',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteUsuario(id: string): Promise<BaseResponseDto<Usuarios>> {
        try {
            const usuario = await this.usuariosRepository.findOne({
                where: { idUsuario: id },
            });

            if (!usuario) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Usuario no encontrado',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!usuario.activo) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'El usuario ya está inactivo',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            usuario.activo = false;
            await this.usuariosRepository.save(usuario);

            return new BaseResponseDto<Usuarios>(
                true,
                'Usuario desactivado exitosamente',
                usuario,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios>(
                false,
                'Error al desactivar el usuario',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async activateUsuario(id: string): Promise<BaseResponseDto<Usuarios>> {
        try {
            const usuario = await this.usuariosRepository.findOne({
                where: { idUsuario: id },
            });

            if (!usuario) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Usuario no encontrado',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (usuario.activo) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'El usuario ya está activo',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            usuario.activo = true;
            await this.usuariosRepository.save(usuario);

            return new BaseResponseDto<Usuarios>(
                true,
                'Usuario activado exitosamente',
                usuario,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios>(
                false,
                'Error al activar el usuario',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async cambiarPassword(id: string, currentPassword: string, newPassword: string): Promise<BaseResponseDto<Usuarios>> {
        try {
            const usuario = await this.usuariosRepository.findOne({
                where: { idUsuario: id },
            });

            if (!usuario) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'Usuario no encontrado',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            // Verificar la contraseña actual
            const isPasswordValid = await bcrypt.compare(currentPassword, usuario.passwordHash);

            if (!isPasswordValid) {
                return new BaseResponseDto<Usuarios>(
                    false,
                    'La contraseña actual es incorrecta',
                    undefined,
                    null,
                    HttpStatus.UNAUTHORIZED,
                );
            }

            // Hashear la nueva contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            usuario.passwordHash = hashedPassword;

            await this.usuariosRepository.save(usuario);

            return new BaseResponseDto<Usuarios>(
                true,
                'Contraseña cambiada exitosamente',
                usuario,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Usuarios>(
                false,
                'Error al cambiar la contraseña',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
