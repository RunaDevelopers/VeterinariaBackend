import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leads } from '../../entities/Leads';
import { TipoServicios } from '../../entities/TipoServicios';
import { CreateLeadDto, UpdateLeadDto } from 'src/DTO';
import { BaseResponseDto } from 'src/DTO/baseResponse/baseResponse.dto';
import { LeadInterface } from 'src/interfaces';

@Injectable()
export class LeadsService implements LeadInterface {
  constructor(
    @InjectRepository(Leads)
    private readonly leadsRepository: Repository<Leads>,
    @InjectRepository(TipoServicios)
    private readonly tipoServiciosRepository: Repository<TipoServicios>,
  ) { }

  /**
   * Obtener todos los leads
   */
  async findAll(): Promise<BaseResponseDto<Leads[]>> {
    try {
      const leads = await this.leadsRepository.find({
        relations: ['tipoServicio'],
        order: {
          fechaCreacion: 'DESC',
        },
      });
      return new BaseResponseDto<Leads[]>(
        true,
        'Lista de leads cargada exitosamente',
        leads,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<Leads[]>(
        false,
        'Error al obtener la lista de leads',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener leads recientes (últimos 100)
   */
  async findAllActive(): Promise<BaseResponseDto<Leads[]>> {
    try {
      const leads = await this.leadsRepository.find({
        relations: ['tipoServicio'],
        order: {
          fechaCreacion: 'DESC',
        },
        take: 100,
      });
      return new BaseResponseDto<Leads[]>(
        true,
        'Leads recientes cargados exitosamente',
        leads,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<Leads[]>(
        false,
        'Error al obtener los leads recientes',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener un lead por ID
   */
  async findOne(id: string): Promise<BaseResponseDto<Leads>> {
    try {
      const lead = await this.leadsRepository.findOne({
        where: { idLead: id },
        relations: ['tipoServicio'],
      });

      if (!lead) {
        return new BaseResponseDto<Leads>(
          false,
          `Lead con ID ${id} no encontrado`,
          undefined,
          null,
          HttpStatus.NOT_FOUND,
        );
      }

      return new BaseResponseDto<Leads>(
        true,
        'Lead encontrado exitosamente',
        lead,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<Leads>(
        false,
        'Error al obtener el lead',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Crear un nuevo lead
   */
  async create(createLeadDto: CreateLeadDto): Promise<BaseResponseDto<Leads>> {
    try {
      // Verificar si el tipo de servicio existe
      const tipoServicio = await this.tipoServiciosRepository.findOne({
        where: { idTipoServicio: createLeadDto.idTipoServicios },
      });

      if (!tipoServicio) {
        return new BaseResponseDto<Leads>(
          false,
          `Tipo de servicio con ID ${createLeadDto.idTipoServicios} no encontrado`,
          undefined,
          null,
          HttpStatus.NOT_FOUND,
        );
      }

      // Verificar si el tipo de servicio está activo
      if (!tipoServicio.activo) {
        return new BaseResponseDto<Leads>(
          false,
          `El tipo de servicio "${tipoServicio.nombreServicio}" no está activo`,
          undefined,
          null,
          HttpStatus.BAD_REQUEST,
        );
      }

      // Verificar si el correo ya existe
      const existingLead = await this.leadsRepository.findOne({
        where: { correo: createLeadDto.correo },
      });

      if (existingLead) {
        return new BaseResponseDto<Leads>(
          false,
          `Ya existe un lead con el correo "${createLeadDto.correo}"`,
          undefined,
          null,
          HttpStatus.CONFLICT,
        );
      }

      const nuevoLead = this.leadsRepository.create({
        ...createLeadDto,
        fechaCreacion: new Date(),
      });
      const leadGuardado = await this.leadsRepository.save(nuevoLead);

      return new BaseResponseDto<Leads>(
        true,
        'Lead creado exitosamente',
        leadGuardado,
        null,
        HttpStatus.CREATED,
      );
    } catch (error) {
      return new BaseResponseDto<Leads>(
        false,
        'Error al crear el lead',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Actualizar un lead existente
   */
  async update(
    id: string,
    updateLeadDto: UpdateLeadDto,
  ): Promise<BaseResponseDto<Leads>> {
    try {
      // Verificar que el lead existe
      const leadResponse = await this.findOne(id);
      if (!leadResponse.success) {
        return leadResponse;
      }

      const lead = leadResponse.data;

      // Si se está actualizando el tipo de servicio
      if (updateLeadDto.idTipoServicios) {
        const tipoServicio = await this.tipoServiciosRepository.findOne({
          where: { idTipoServicio: updateLeadDto.idTipoServicios },
        });

        if (!tipoServicio) {
          return new BaseResponseDto<Leads>(
            false,
            `Tipo de servicio con ID ${updateLeadDto.idTipoServicios} no encontrado`,
            undefined,
            null,
            HttpStatus.NOT_FOUND,
          );
        }

        if (!tipoServicio.activo) {
          return new BaseResponseDto<Leads>(
            false,
            `El tipo de servicio "${tipoServicio.nombreServicio}" no está activo`,
            undefined,
            null,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // Si se está actualizando el correo, verificar que no exista otro lead con ese correo
      if (updateLeadDto.correo && updateLeadDto.correo !== lead.correo) {
        const existingLead = await this.leadsRepository.findOne({
          where: { correo: updateLeadDto.correo },
        });

        if (existingLead) {
          return new BaseResponseDto<Leads>(
            false,
            `Ya existe otro lead con el correo "${updateLeadDto.correo}"`,
            undefined,
            null,
            HttpStatus.CONFLICT,
          );
        }
      }

      // Actualizar los campos
      Object.assign(lead, updateLeadDto);
      const leadActualizado = await this.leadsRepository.save(lead);

      return new BaseResponseDto<Leads>(
        true,
        'Lead actualizado exitosamente',
        leadActualizado,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<Leads>(
        false,
        'Error al actualizar el lead',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Eliminar un lead (eliminación permanente)
   */
  async remove(id: string): Promise<BaseResponseDto<null>> {
    try {
      const leadResponse = await this.findOne(id);
      if (!leadResponse.success) {
        return new BaseResponseDto<null>(
          false,
          leadResponse.message,
          null,
          null,
          leadResponse.statusCode,
        );
      }

      const lead = leadResponse.data;
      await this.leadsRepository.remove(lead);

      return new BaseResponseDto<null>(
        true,
        `Lead "${lead.nombres} ${lead.apellidos}" eliminado exitosamente`,
        null,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<null>(
        false,
        'Error al eliminar el lead',
        null,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Buscar leads por correo electrónico
   */
  async findByEmail(correo: string): Promise<BaseResponseDto<Leads>> {
    try {
      const lead = await this.leadsRepository.findOne({
        where: { correo },
        relations: ['tipoServicio'],
      });

      if (!lead) {
        return new BaseResponseDto<Leads>(
          false,
          `Lead con correo "${correo}" no encontrado`,
          undefined,
          null,
          HttpStatus.NOT_FOUND,
        );
      }

      return new BaseResponseDto<Leads>(
        true,
        'Lead encontrado exitosamente',
        lead,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<Leads>(
        false,
        'Error al buscar el lead por correo',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Obtener leads por tipo de servicio
   */
  async findByTipoServicio(
    idTipoServicio: string,
  ): Promise<BaseResponseDto<Leads[]>> {
    try {
      const leads = await this.leadsRepository.find({
        where: { idTipoServicios: idTipoServicio },
        relations: ['tipoServicio'],
        order: {
          fechaCreacion: 'DESC',
        },
      });

      return new BaseResponseDto<Leads[]>(
        true,
        'Leads por tipo de servicio cargados exitosamente',
        leads,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return new BaseResponseDto<Leads[]>(
        false,
        'Error al obtener los leads por tipo de servicio',
        undefined,
        error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
