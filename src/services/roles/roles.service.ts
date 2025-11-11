import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/Roles';
import { CreateRolDto } from '../../DTO/roles/create-rol.dto';
import { UpdateRolDto } from '../../DTO/roles/update-rol.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  /**
   * Obtener todos los roles
   */
  async findAll(): Promise<Roles[]> {
    try {
      return await this.rolesRepository.find({
        order: {
          fechaCreacion: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener la lista de roles',
      );
    }
  }

  /**
   * Obtener solo roles activos
   */
  async findAllActive(): Promise<Roles[]> {
    try {
      return await this.rolesRepository.find({
        where: { activo: true },
        order: {
          nombreRol: 'ASC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los roles activos',
      );
    }
  }

  /**
   * Obtener un rol por ID
   */
  async findOne(id: string): Promise<Roles> {
    try {
      const rol = await this.rolesRepository.findOne({
        where: { idRol: id },
        relations: ['usuarios'], // Incluir usuarios relacionados
      });

      if (!rol) {
        throw new NotFoundException(`Rol con ID ${id} no encontrado`);
      }

      return rol;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el rol');
    }
  }

  /**
   * Crear un nuevo rol
   */
  async create(createRolDto: CreateRolDto): Promise<Roles> {
    // Verificar si el nombre del rol ya existe
    const existingRol = await this.rolesRepository.findOne({
      where: { nombreRol: createRolDto.nombreRol },
    });

    if (existingRol) {
      throw new ConflictException(
        `El rol con nombre "${createRolDto.nombreRol}" ya existe`,
      );
    }

    try {
      const nuevoRol = this.rolesRepository.create(createRolDto);
      return await this.rolesRepository.save(nuevoRol);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el rol');
    }
  }

  /**
   * Actualizar un rol existente
   */
  async update(id: string, updateRolDto: UpdateRolDto): Promise<Roles> {
    // Verificar que el rol existe
    const rol = await this.findOne(id);

    // Si se está actualizando el nombre, verificar que no exista otro rol con ese nombre
    if (updateRolDto.nombreRol && updateRolDto.nombreRol !== rol.nombreRol) {
      const existingRol = await this.rolesRepository.findOne({
        where: { nombreRol: updateRolDto.nombreRol },
      });

      if (existingRol) {
        throw new ConflictException(
          `Ya existe otro rol con el nombre "${updateRolDto.nombreRol}"`,
        );
      }
    }

    try {
      // Actualizar los campos
      Object.assign(rol, updateRolDto);
      rol.fechaModificacion = new Date();

      return await this.rolesRepository.save(rol);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el rol');
    }
  }

  /**
   * Eliminar un rol (eliminación lógica)
   */
  async remove(id: string): Promise<{ message: string; rol: Roles }> {
    const rol = await this.findOne(id);

    // Verificar si el rol tiene usuarios asignados
    if (rol.usuarios && rol.usuarios.length > 0) {
      throw new ConflictException(
        `No se puede eliminar el rol "${rol.nombreRol}" porque tiene ${rol.usuarios.length} usuario(s) asignado(s)`,
      );
    }

    try {
      // Eliminación lógica (desactivar)
      rol.activo = false;
      rol.fechaModificacion = new Date();
      const rolDesactivado = await this.rolesRepository.save(rol);

      return {
        message: `Rol "${rol.nombreRol}" desactivado exitosamente`,
        rol: rolDesactivado,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el rol');
    }
  }

  /**
   * Eliminar permanentemente un rol
   */
  async hardDelete(id: string): Promise<{ message: string }> {
    const rol = await this.findOne(id);

    // Verificar si el rol tiene usuarios asignados
    if (rol.usuarios && rol.usuarios.length > 0) {
      throw new ConflictException(
        `No se puede eliminar permanentemente el rol "${rol.nombreRol}" porque tiene usuarios asignados`,
      );
    }

    try {
      await this.rolesRepository.remove(rol);
      return {
        message: `Rol "${rol.nombreRol}" eliminado permanentemente`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al eliminar permanentemente el rol',
      );
    }
  }

  /**
   * Reactivar un rol desactivado
   */
  async activate(id: string): Promise<Roles> {
    const rol = await this.findOne(id);

    if (rol.activo) {
      throw new ConflictException('El rol ya está activo');
    }

    try {
      rol.activo = true;
      rol.fechaModificacion = new Date();
      return await this.rolesRepository.save(rol);
    } catch (error) {
      throw new InternalServerErrorException('Error al activar el rol');
    }
  }
}
