import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoServicios } from '../../entities/TipoServicios';
import { CreateTipoServicioDto } from '../../DTO/tipo-servicios/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from '../../DTO/tipo-servicios/update-tipo-servicio.dto';

@Injectable()
export class TipoServiciosService {
  constructor(
    @InjectRepository(TipoServicios)
    private readonly tipoServiciosRepository: Repository<TipoServicios>,
  ) {}

  /**
   * Obtener todos los tipos de servicios
   */
  async findAll(): Promise<TipoServicios[]> {
    try {
      return await this.tipoServiciosRepository.find({
        order: {
          nombreServicio: 'ASC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener la lista de tipos de servicios',
      );
    }
  }

  /**
   * Obtener solo tipos de servicios activos
   */
  async findAllActive(): Promise<TipoServicios[]> {
    try {
      return await this.tipoServiciosRepository.find({
        where: { activo: true },
        order: {
          nombreServicio: 'ASC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los tipos de servicios activos',
      );
    }
  }

  /**
   * Obtener tipos de servicios por categoría
   */
  async findByCategoria(categoria: string): Promise<TipoServicios[]> {
    try {
      return await this.tipoServiciosRepository.find({
        where: { categoria, activo: true },
        order: {
          nombreServicio: 'ASC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los tipos de servicios por categoría',
      );
    }
  }

  /**
   * Obtener servicios que requieren veterinario
   */
  async findRequiereVeterinario(): Promise<TipoServicios[]> {
    try {
      return await this.tipoServiciosRepository.find({
        where: { requiereVeterinario: true, activo: true },
        order: {
          nombreServicio: 'ASC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los servicios que requieren veterinario',
      );
    }
  }

  /**
   * Obtener servicios que requieren cita
   */
  async findRequiereCita(): Promise<TipoServicios[]> {
    try {
      return await this.tipoServiciosRepository.find({
        where: { requiereCita: true, activo: true },
        order: {
          nombreServicio: 'ASC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los servicios que requieren cita',
      );
    }
  }

  /**
   * Obtener un tipo de servicio por ID
   */
  async findOne(id: string): Promise<TipoServicios> {
    try {
      const tipoServicio = await this.tipoServiciosRepository.findOne({
        where: { idTipoServicio: id },
        relations: ['citasMedicas', 'reservas', 'serviciosRealizados'],
      });

      if (!tipoServicio) {
        throw new NotFoundException(
          `Tipo de servicio con ID ${id} no encontrado`,
        );
      }

      return tipoServicio;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al obtener el tipo de servicio',
      );
    }
  }

  /**
   * Obtener un tipo de servicio por ID (sin relaciones)
   */
  async findOneSimple(id: string): Promise<TipoServicios> {
    try {
      const tipoServicio = await this.tipoServiciosRepository.findOne({
        where: { idTipoServicio: id },
      });

      if (!tipoServicio) {
        throw new NotFoundException(
          `Tipo de servicio con ID ${id} no encontrado`,
        );
      }

      return tipoServicio;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al obtener el tipo de servicio',
      );
    }
  }

  /**
   * Crear un nuevo tipo de servicio
   */
  async create(
    createTipoServicioDto: CreateTipoServicioDto,
  ): Promise<TipoServicios> {
    // Verificar si el nombre del servicio ya existe
    const existingServicio = await this.tipoServiciosRepository.findOne({
      where: { nombreServicio: createTipoServicioDto.nombreServicio },
    });

    if (existingServicio) {
      throw new ConflictException(
        `El tipo de servicio "${createTipoServicioDto.nombreServicio}" ya existe`,
      );
    }

    try {
      const nuevoTipoServicio = this.tipoServiciosRepository.create({
        ...createTipoServicioDto,
        precioBase: createTipoServicioDto.precioBase?.toString(),
      });
      return await this.tipoServiciosRepository.save(nuevoTipoServicio);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear el tipo de servicio',
      );
    }
  }

  /**
   * Actualizar un tipo de servicio existente
   */
  async update(
    id: string,
    updateTipoServicioDto: UpdateTipoServicioDto,
  ): Promise<TipoServicios> {
    // Verificar que el tipo de servicio existe
    const tipoServicio = await this.findOneSimple(id);

    // Si se está actualizando el nombre, verificar que no exista otro servicio con ese nombre
    if (
      updateTipoServicioDto.nombreServicio &&
      updateTipoServicioDto.nombreServicio !== tipoServicio.nombreServicio
    ) {
      const existingServicio = await this.tipoServiciosRepository.findOne({
        where: { nombreServicio: updateTipoServicioDto.nombreServicio },
      });

      if (existingServicio) {
        throw new ConflictException(
          `Ya existe otro tipo de servicio con el nombre "${updateTipoServicioDto.nombreServicio}"`,
        );
      }
    }

    try {
      // Actualizar los campos
      Object.assign(tipoServicio, {
        ...updateTipoServicioDto,
        precioBase: updateTipoServicioDto.precioBase?.toString(),
      });
      tipoServicio.fechaModificacion = new Date();

      return await this.tipoServiciosRepository.save(tipoServicio);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al actualizar el tipo de servicio',
      );
    }
  }

  /**
   * Eliminar un tipo de servicio (eliminación lógica)
   */
  async remove(
    id: string,
  ): Promise<{ message: string; tipoServicio: TipoServicios }> {
    const tipoServicio = await this.findOne(id);

    // Verificar si el tipo de servicio tiene registros relacionados
    const tieneRelaciones =
      (tipoServicio.citasMedicas && tipoServicio.citasMedicas.length > 0) ||
      (tipoServicio.reservas && tipoServicio.reservas.length > 0) ||
      (tipoServicio.serviciosRealizados &&
        tipoServicio.serviciosRealizados.length > 0);

    if (tieneRelaciones) {
      throw new ConflictException(
        `No se puede eliminar el tipo de servicio "${tipoServicio.nombreServicio}" porque tiene registros asociados (citas, reservas o servicios realizados)`,
      );
    }

    try {
      // Eliminación lógica (desactivar)
      tipoServicio.activo = false;
      tipoServicio.fechaModificacion = new Date();
      const tipoServicioDesactivado =
        await this.tipoServiciosRepository.save(tipoServicio);

      return {
        message: `Tipo de servicio "${tipoServicio.nombreServicio}" desactivado exitosamente`,
        tipoServicio: tipoServicioDesactivado,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al eliminar el tipo de servicio',
      );
    }
  }

  /**
   * Eliminar permanentemente un tipo de servicio
   */
  async hardDelete(id: string): Promise<{ message: string }> {
    const tipoServicio = await this.findOne(id);

    // Verificar si el tipo de servicio tiene registros relacionados
    const tieneRelaciones =
      (tipoServicio.citasMedicas && tipoServicio.citasMedicas.length > 0) ||
      (tipoServicio.reservas && tipoServicio.reservas.length > 0) ||
      (tipoServicio.serviciosRealizados &&
        tipoServicio.serviciosRealizados.length > 0);

    if (tieneRelaciones) {
      throw new ConflictException(
        `No se puede eliminar permanentemente el tipo de servicio "${tipoServicio.nombreServicio}" porque tiene registros asociados`,
      );
    }

    try {
      await this.tipoServiciosRepository.remove(tipoServicio);
      return {
        message: `Tipo de servicio "${tipoServicio.nombreServicio}" eliminado permanentemente`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al eliminar permanentemente el tipo de servicio',
      );
    }
  }

  /**
   * Reactivar un tipo de servicio desactivado
   */
  async activate(id: string): Promise<TipoServicios> {
    const tipoServicio = await this.findOneSimple(id);

    if (tipoServicio.activo) {
      throw new ConflictException('El tipo de servicio ya está activo');
    }

    try {
      tipoServicio.activo = true;
      tipoServicio.fechaModificacion = new Date();
      return await this.tipoServiciosRepository.save(tipoServicio);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al activar el tipo de servicio',
      );
    }
  }
}
