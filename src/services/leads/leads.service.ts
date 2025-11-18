import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leads } from '../../entities/Leads';
import { TipoServicios } from '../../entities/TipoServicios';
import { CreateLeadDto } from '../../DTO/leads/create-lead.dto';
import { UpdateLeadDto } from '../../DTO/leads/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Leads)
    private readonly leadsRepository: Repository<Leads>,
    @InjectRepository(TipoServicios)
    private readonly tipoServiciosRepository: Repository<TipoServicios>,
  ) {}

  /**
   * Obtener todos los leads
   */
  async findAll(): Promise<Leads[]> {
    try {
      return await this.leadsRepository.find({
        relations: ['tipoServicio'],
        order: {
          fechaCreacion: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener la lista de leads',
      );
    }
  }

  /**
   * Obtener leads recientes (últimos 100)
   */
  async findAllActive(): Promise<Leads[]> {
    try {
      return await this.leadsRepository.find({
        relations: ['tipoServicio'],
        order: {
          fechaCreacion: 'DESC',
        },
        take: 100,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los leads recientes',
      );
    }
  }

  /**
   * Obtener un lead por ID
   */
  async findOne(id: string): Promise<Leads> {
    try {
      const lead = await this.leadsRepository.findOne({
        where: { idLead: id },
        relations: ['tipoServicio'],
      });

      if (!lead) {
        throw new NotFoundException(`Lead con ID ${id} no encontrado`);
      }

      return lead;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al obtener el lead');
    }
  }

  /**
   * Crear un nuevo lead
   */
  async create(createLeadDto: CreateLeadDto): Promise<Leads> {
    // Verificar si el tipo de servicio existe
    const tipoServicio = await this.tipoServiciosRepository.findOne({
      where: { idTipoServicio: createLeadDto.idTipoServicios },
    });

    if (!tipoServicio) {
      throw new NotFoundException(
        `Tipo de servicio con ID ${createLeadDto.idTipoServicios} no encontrado`,
      );
    }

    // Verificar si el tipo de servicio está activo
    if (!tipoServicio.activo) {
      throw new BadRequestException(
        `El tipo de servicio "${tipoServicio.nombreServicio}" no está activo`,
      );
    }

    // Verificar si el correo ya existe
    const existingLead = await this.leadsRepository.findOne({
      where: { correo: createLeadDto.correo },
    });

    if (existingLead) {
      throw new ConflictException(
        `Ya existe un lead con el correo "${createLeadDto.correo}"`,
      );
    }

    try {
      const nuevoLead = this.leadsRepository.create({
        ...createLeadDto,
        fechaCreacion: new Date(),
      });
      return await this.leadsRepository.save(nuevoLead);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el lead');
    }
  }

  /**
   * Actualizar un lead existente
   */
  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Leads> {
    // Verificar que el lead existe
    const lead = await this.findOne(id);

    // Si se está actualizando el tipo de servicio
    if (updateLeadDto.idTipoServicios) {
      const tipoServicio = await this.tipoServiciosRepository.findOne({
        where: { idTipoServicio: updateLeadDto.idTipoServicios },
      });

      if (!tipoServicio) {
        throw new NotFoundException(
          `Tipo de servicio con ID ${updateLeadDto.idTipoServicios} no encontrado`,
        );
      }

      if (!tipoServicio.activo) {
        throw new BadRequestException(
          `El tipo de servicio "${tipoServicio.nombreServicio}" no está activo`,
        );
      }
    }

    // Si se está actualizando el correo, verificar que no exista otro lead con ese correo
    if (updateLeadDto.correo && updateLeadDto.correo !== lead.correo) {
      const existingLead = await this.leadsRepository.findOne({
        where: { correo: updateLeadDto.correo },
      });

      if (existingLead) {
        throw new ConflictException(
          `Ya existe otro lead con el correo "${updateLeadDto.correo}"`,
        );
      }
    }

    try {
      // Actualizar los campos
      Object.assign(lead, updateLeadDto);

      return await this.leadsRepository.save(lead);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el lead');
    }
  }

  /**
   * Eliminar un lead (eliminación permanente)
   */
  async remove(id: string): Promise<{ message: string }> {
    const lead = await this.findOne(id);

    try {
      await this.leadsRepository.remove(lead);
      return {
        message: `Lead "${lead.nombres} ${lead.apellidos}" eliminado exitosamente`,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar el lead');
    }
  }

  /**
   * Buscar leads por correo electrónico
   */
  async findByEmail(correo: string): Promise<Leads | null> {
    try {
      return await this.leadsRepository.findOne({
        where: { correo },
        relations: ['tipoServicio'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al buscar el lead por correo',
      );
    }
  }

  /**
   * Obtener leads por tipo de servicio
   */
  async findByTipoServicio(idTipoServicio: string): Promise<Leads[]> {
    try {
      return await this.leadsRepository.find({
        where: { idTipoServicios: idTipoServicio },
        relations: ['tipoServicio'],
        order: {
          fechaCreacion: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener los leads por tipo de servicio',
      );
    }
  }
}
