import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoServicios } from '../../entities/TipoServicios';
import { CreateTipoServicioDto } from '../../DTO/tipo-servicios/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from '../../DTO/tipo-servicios/update-tipo-servicio.dto';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { TipoServiciosInterface } from 'src/interfaces/tipo-servicios.interface';

@Injectable()
export class TipoServiciosService implements TipoServiciosInterface{
  constructor(
    @InjectRepository(TipoServicios)
    private readonly tipoServiciosRepository: Repository<TipoServicios>,
  ) { }

  /**
   * Obtener todos los tipos de servicios
   */
  async findAll(): Promise<BaseResponseDto<TipoServicios[]>> {
    try {
      const tiposServicios = await this.tipoServiciosRepository.find({
        order: {
          nombreServicio: 'ASC',
        },
      });
      return new BaseResponseDto<TipoServicios[]>(
        true,
        'Lista cargada exitosamente',
        tiposServicios,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios[]>(
        false,
        'Error al obtener los tipos de servicios',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener solo tipos de servicios activos
   */
  async findAllActive(): Promise<BaseResponseDto<TipoServicios[]>> {
    try {
      const tiposServicios = await this.tipoServiciosRepository.find({
        where: { activo: true },
        order: {
          nombreServicio: 'ASC',
        },
      });
      return new BaseResponseDto<TipoServicios[]>(
        true,
        'Tipos de servicios activos cargados exitosamente',
        tiposServicios,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios[]>(
        false,
        'Error al obtener los tipos de servicios activos',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener tipos de servicios por categoría
   */
  async findByCategoria(
    categoria: string,
  ): Promise<BaseResponseDto<TipoServicios[]>> {
    try {
      const tiposServicios = await this.tipoServiciosRepository.find({
        where: { categoria, activo: true },
        order: {
          nombreServicio: 'ASC',
        },
      });
      return new BaseResponseDto<TipoServicios[]>(
        true,
        `Tipos de servicios de categoría "${categoria}" cargados exitosamente`,
        tiposServicios,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios[]>(
        false,
        'Error al obtener los tipos de servicios por categoría',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener servicios que requieren veterinario
   */
  async findRequiereVeterinario(): Promise<
    BaseResponseDto<TipoServicios[]>
  > {
    try {
      const tiposServicios = await this.tipoServiciosRepository.find({
        where: { requiereVeterinario: true, activo: true },
        order: {
          nombreServicio: 'ASC',
        },
      });
      return new BaseResponseDto<TipoServicios[]>(
        true,
        'Servicios que requieren veterinario cargados exitosamente',
        tiposServicios,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios[]>(
        false,
        'Error al obtener los servicios que requieren veterinario',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener servicios que requieren cita
   */
  async findRequiereCita(): Promise<BaseResponseDto<TipoServicios[]>> {
    try {
      const tiposServicios = await this.tipoServiciosRepository.find({
        where: { requiereCita: true, activo: true },
        order: {
          nombreServicio: 'ASC',
        },
      });
      return new BaseResponseDto<TipoServicios[]>(
        true,
        'Servicios que requieren cita cargados exitosamente',
        tiposServicios,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios[]>(
        false,
        'Error al obtener los servicios que requieren cita',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener un tipo de servicio por ID
   */
  async findOne(id: string): Promise<BaseResponseDto<TipoServicios>> {
    try {
      const tipoServicio = await this.tipoServiciosRepository.findOne({
        where: { idTipoServicio: id },
        relations: ['citasMedicas', 'reservas', 'serviciosRealizados'],
      });

      if (!tipoServicio) {
        return new BaseResponseDto<TipoServicios>(
          false,
          `Tipo de servicio con ID ${id} no encontrado`,
          undefined,
          null,
          HttpStatus.NOT_FOUND,
        );
      }

      return new BaseResponseDto<TipoServicios>(
        true,
        'Tipo de servicio encontrado exitosamente',
        tipoServicio,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios>(
        false,
        'Error al obtener el tipo de servicio',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener un tipo de servicio por ID (sin relaciones)
   */
  async findOneSimple(id: string): Promise<BaseResponseDto<TipoServicios>> {
    try {
      const tipoServicio = await this.tipoServiciosRepository.findOne({
        where: { idTipoServicio: id },
      });

      if (!tipoServicio) {
        return new BaseResponseDto<TipoServicios>(
          false,
          `Tipo de servicio con ID ${id} no encontrado`,
          undefined,
          null,
          HttpStatus.NOT_FOUND,
        );
      }

      return new BaseResponseDto<TipoServicios>(
        true,
        'Tipo de servicio encontrado exitosamente',
        tipoServicio,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios>(
        false,
        'Error al obtener el tipo de servicio',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Crear un nuevo tipo de servicio
   */
  async create(
    createTipoServicioDto: CreateTipoServicioDto,
  ): Promise<BaseResponseDto<TipoServicios>> {
    try {
      // Verificar si el nombre del servicio ya existe
      const existingServicio = await this.tipoServiciosRepository.findOne({
        where: { nombreServicio: createTipoServicioDto.nombreServicio },
      });

      if (existingServicio) {
        return new BaseResponseDto<TipoServicios>(
          false,
          `El tipo de servicio "${createTipoServicioDto.nombreServicio}" ya existe`,
          undefined,
          null,
          HttpStatus.CONFLICT,
        );
      }

      const nuevoTipoServicio = this.tipoServiciosRepository.create({
        ...createTipoServicioDto,
        precioBase: createTipoServicioDto.precioBase?.toString(),
      });
      const tipoServicioGuardado =
        await this.tipoServiciosRepository.save(nuevoTipoServicio);

      return new BaseResponseDto<TipoServicios>(
        true,
        'Tipo de servicio creado exitosamente',
        tipoServicioGuardado,
        null,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios>(
        false,
        'Error al crear el tipo de servicio',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Actualizar un tipo de servicio existente
   */
  async update(
    id: string,
    updateTipoServicioDto: UpdateTipoServicioDto,
  ): Promise<BaseResponseDto<TipoServicios>> {
    try {
      // Verificar que el tipo de servicio existe
      const tipoServicioResponse = await this.findOneSimple(id);
      if (!tipoServicioResponse.success) {
        return tipoServicioResponse;
      }

      const tipoServicio = tipoServicioResponse.data;

      // Si se está actualizando el nombre, verificar que no exista otro servicio con ese nombre
      if (
        updateTipoServicioDto.nombreServicio &&
        updateTipoServicioDto.nombreServicio !== tipoServicio.nombreServicio
      ) {
        const existingServicio = await this.tipoServiciosRepository.findOne({
          where: { nombreServicio: updateTipoServicioDto.nombreServicio },
        });

        if (existingServicio) {
          return new BaseResponseDto<TipoServicios>(
            false,
            `Ya existe otro tipo de servicio con el nombre "${updateTipoServicioDto.nombreServicio}"`,
            undefined,
            null,
            HttpStatus.CONFLICT,
          );
        }
      }

      // Actualizar los campos
      Object.assign(tipoServicio, {
        ...updateTipoServicioDto,
        precioBase: updateTipoServicioDto.precioBase?.toString(),
      });
      tipoServicio.fechaModificacion = new Date();

      const tipoServicioActualizado =
        await this.tipoServiciosRepository.save(tipoServicio);

      return new BaseResponseDto<TipoServicios>(
        true,
        'Tipo de servicio actualizado exitosamente',
        tipoServicioActualizado,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios>(
        false,
        'Error al actualizar el tipo de servicio',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Eliminar un tipo de servicio (eliminación lógica)
   */
  async remove(id: string): Promise<BaseResponseDto<TipoServicios>> {
    try {
      const tipoServicioResponse = await this.findOne(id);
      if (!tipoServicioResponse.success) {
        return tipoServicioResponse;
      }

      const tipoServicio = tipoServicioResponse.data;

      // Verificar si el tipo de servicio tiene registros relacionados
      const tieneRelaciones =
        (tipoServicio.citasMedicas && tipoServicio.citasMedicas.length > 0) ||
        (tipoServicio.reservas && tipoServicio.reservas.length > 0) ||
        (tipoServicio.serviciosRealizados &&
          tipoServicio.serviciosRealizados.length > 0);

      if (tieneRelaciones) {
        return new BaseResponseDto<TipoServicios>(
          false,
          `No se puede eliminar el tipo de servicio "${tipoServicio.nombreServicio}" porque tiene registros asociados (citas, reservas o servicios realizados)`,
          undefined,
          null,
          HttpStatus.CONFLICT,
        );
      }

      // Eliminación lógica (desactivar)
      tipoServicio.activo = false;
      tipoServicio.fechaModificacion = new Date();
      const tipoServicioDesactivado =
        await this.tipoServiciosRepository.save(tipoServicio);

      return new BaseResponseDto<TipoServicios>(
        true,
        `Tipo de servicio "${tipoServicio.nombreServicio}" desactivado exitosamente`,
        tipoServicioDesactivado,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios>(
        false,
        'Error al eliminar el tipo de servicio',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Eliminar permanentemente un tipo de servicio
   */
  async hardDelete(id: string): Promise<BaseResponseDto<null>> {
    try {
      const tipoServicioResponse = await this.findOne(id);
      if (!tipoServicioResponse.success) {
        return new BaseResponseDto<null>(
          false,
          tipoServicioResponse.message,
          null,
          null,
          tipoServicioResponse.statusCode,
        );
      }

      const tipoServicio = tipoServicioResponse.data;

      // Verificar si el tipo de servicio tiene registros relacionados
      const tieneRelaciones =
        (tipoServicio.citasMedicas && tipoServicio.citasMedicas.length > 0) ||
        (tipoServicio.reservas && tipoServicio.reservas.length > 0) ||
        (tipoServicio.serviciosRealizados &&
          tipoServicio.serviciosRealizados.length > 0);

      if (tieneRelaciones) {
        return new BaseResponseDto<null>(
          false,
          `No se puede eliminar permanentemente el tipo de servicio "${tipoServicio.nombreServicio}" porque tiene registros asociados`,
          null,
          null,
          HttpStatus.CONFLICT,
        );
      }

      await this.tipoServiciosRepository.remove(tipoServicio);

      return new BaseResponseDto<null>(
        true,
        `Tipo de servicio "${tipoServicio.nombreServicio}" eliminado permanentemente`,
        null,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<null>(
        false,
        'Error al eliminar permanentemente el tipo de servicio',
        null,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Reactivar un tipo de servicio desactivado
   */
  async activate(id: string): Promise<BaseResponseDto<TipoServicios>> {
    try {
      const tipoServicioResponse = await this.findOneSimple(id);
      if (!tipoServicioResponse.success) {
        return tipoServicioResponse;
      }

      const tipoServicio = tipoServicioResponse.data;

      if (tipoServicio.activo) {
        return new BaseResponseDto<TipoServicios>(
          false,
          'El tipo de servicio ya está activo',
          undefined,
          null,
          HttpStatus.CONFLICT,
        );
      }

      tipoServicio.activo = true;
      tipoServicio.fechaModificacion = new Date();
      const tipoServicioActivado =
        await this.tipoServiciosRepository.save(tipoServicio);

      return new BaseResponseDto<TipoServicios>(
        true,
        'Tipo de servicio activado exitosamente',
        tipoServicioActivado,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<TipoServicios>(
        false,
        'Error al activar el tipo de servicio',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
