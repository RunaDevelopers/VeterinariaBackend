import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascotas } from '../../entities/Mascotas';
import { BaseResponseDto } from '../../DTO/baseResponse/baseResponse.dto';
import { CreateMascotaDto } from '../../DTO/mascotas/create-mascota.dto';
import { UpdateMascotaDto } from '../../DTO/mascotas/update-mascota.dto';
import { IMascotaService } from '../../interfaces/mascota.interface';
import { ClientesService } from '../clientes/clientes.service';
import { EspeciesService } from '../especies/especies.service';
import { RazasService } from '../razas/razas.service';

@Injectable()
export class MascotasService implements IMascotaService {
    constructor(
        @InjectRepository(Mascotas)
        private readonly mascotasRepository: Repository<Mascotas>,
        private readonly clientesService: ClientesService,
        private readonly especiesService: EspeciesService,
        private readonly razasService: RazasService,
    ) { }

    async getMascotas(): Promise<BaseResponseDto<Mascotas[]>> {
        try {
            const mascotas = await this.mascotasRepository.find({
                relations: ['idCliente2', 'idEspecie2', 'idRaza'],
            });

            return new BaseResponseDto<Mascotas[]>(
                true,
                'Mascotas obtenidas exitosamente',
                mascotas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas[]>(
                false,
                'Error al obtener las mascotas',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getMascotasActivas(): Promise<BaseResponseDto<Mascotas[]>> {
        try {
            const mascotas = await this.mascotasRepository.find({
                where: { activo: true },
                relations: ['idCliente2', 'idEspecie2', 'idRaza'],
            });

            return new BaseResponseDto<Mascotas[]>(
                true,
                'Mascotas activas obtenidas exitosamente',
                mascotas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas[]>(
                false,
                'Error al obtener las mascotas activas',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getMascotaById(id: string): Promise<BaseResponseDto<Mascotas>> {
        try {
            const mascota = await this.mascotasRepository.findOne({
                where: { idMascota: id },
                relations: ['idCliente2', 'idEspecie2', 'idRaza'],
            });

            if (!mascota) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Mascota no encontrada',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            return new BaseResponseDto<Mascotas>(
                true,
                'Mascota obtenida exitosamente',
                mascota,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas>(
                false,
                'Error al obtener la mascota',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getMascotasByCliente(idCliente: string): Promise<BaseResponseDto<Mascotas[]>> {
        try {
            // Validar que el cliente exista y esté activo
            const clienteResponse = await this.clientesService.buscarClientePorId(idCliente);
            if (!clienteResponse.success) {
                return new BaseResponseDto<Mascotas[]>(
                    false,
                    'Cliente no encontrado o inactivo',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            const mascotas = await this.mascotasRepository.find({
                where: { idCliente, activo: true },
                relations: ['idEspecie2', 'idRaza'],
            });

            return new BaseResponseDto<Mascotas[]>(
                true,
                'Mascotas del cliente obtenidas exitosamente',
                mascotas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas[]>(
                false,
                'Error al obtener las mascotas del cliente',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getMascotasByEspecie(idEspecie: string): Promise<BaseResponseDto<Mascotas[]>> {
        try {
            // Validar que la especie exista y esté activa
            const especieResponse = await this.especiesService.getEspecieById(idEspecie);
            if (!especieResponse.success) {
                return new BaseResponseDto<Mascotas[]>(
                    false,
                    'Especie no encontrada o inactiva',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            const mascotas = await this.mascotasRepository.find({
                where: { idEspecie, activo: true },
                relations: ['idCliente2', 'idRaza'],
            });

            return new BaseResponseDto<Mascotas[]>(
                true,
                'Mascotas de la especie obtenidas exitosamente',
                mascotas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas[]>(
                false,
                'Error al obtener las mascotas de la especie',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getMascotasByRaza(idRaza: string): Promise<BaseResponseDto<Mascotas[]>> {
        try {
            // Validar que la raza exista y esté activa
            const razaResponse = await this.razasService.getRazaById(idRaza);
            if (!razaResponse.success) {
                return new BaseResponseDto<Mascotas[]>(
                    false,
                    'Raza no encontrada o inactiva',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            const mascotas = await this.mascotasRepository.find({
                where: { idRaza: { idRaza } },
                relations: ['idCliente2', 'idEspecie2', 'idRaza'],
            });

            return new BaseResponseDto<Mascotas[]>(
                true,
                'Mascotas de la raza obtenidas exitosamente',
                mascotas,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas[]>(
                false,
                'Error al obtener las mascotas de la raza',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async createMascota(createMascotaDto: CreateMascotaDto): Promise<BaseResponseDto<Mascotas>> {
        try {
            // Validar que el cliente exista y esté activo
            const clienteResponse = await this.clientesService.buscarClientePorId(createMascotaDto.idCliente);
            if (!clienteResponse.success) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Cliente no encontrado o inactivo',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Validar que la especie exista y esté activa
            const especieResponse = await this.especiesService.getEspecieById(createMascotaDto.idEspecie);
            if (!especieResponse.success) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Especie no encontrada o inactiva',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Si se proporciona raza, validar que exista, esté activa y pertenezca a la especie
            if (createMascotaDto.idRaza) {
                const razaResponse = await this.razasService.getRazaById(createMascotaDto.idRaza);
                if (!razaResponse.success) {
                    return new BaseResponseDto<Mascotas>(
                        false,
                        'Raza no encontrada o inactiva',
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }

                // Validar que la raza pertenezca a la especie seleccionada
                if (razaResponse.data.idEspecie !== createMascotaDto.idEspecie) {
                    return new BaseResponseDto<Mascotas>(
                        false,
                        'La raza no pertenece a la especie seleccionada',
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            // Si se proporciona fecha de esterilización, debe estar esterilizado
            if (createMascotaDto.fechaEsterilizacion && !createMascotaDto.esterilizado) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Si se proporciona fecha de esterilización, la mascota debe estar marcada como esterilizada',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Si está fallecido, debe tener fecha de fallecimiento
            if (createMascotaDto.fallecido && !createMascotaDto.fechaFallecimiento) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Si la mascota está fallecida, debe proporcionar la fecha de fallecimiento',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const nuevaMascota = this.mascotasRepository.create(createMascotaDto as any);
            const saved = await this.mascotasRepository.save(nuevaMascota);
            const mascotaGuardada = Array.isArray(saved) ? saved[0] : saved;

            // Obtener la mascota con sus relaciones
            const mascotaCompleta = await this.mascotasRepository.findOne({
                where: { idMascota: mascotaGuardada.idMascota },
                relations: ['idCliente2', 'idEspecie2', 'idRaza'],
            });

            if (!mascotaCompleta) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Error al recuperar la mascota creada',
                    undefined,
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            return new BaseResponseDto<Mascotas>(
                true,
                'Mascota creada exitosamente',
                mascotaCompleta,
                null,
                HttpStatus.CREATED,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas>(
                false,
                'Error al crear la mascota',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateMascota(id: string, updateMascotaDto: UpdateMascotaDto): Promise<BaseResponseDto<Mascotas>> {
        try {
            // Verificar que la mascota existe
            const mascota = await this.mascotasRepository.findOne({
                where: { idMascota: id },
            });

            if (!mascota) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Mascota no encontrada',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            // Si se actualiza el cliente, validar que exista y esté activo
            if (updateMascotaDto.idCliente) {
                const clienteResponse = await this.clientesService.buscarClientePorId(updateMascotaDto.idCliente);
                if (!clienteResponse.success) {
                    return new BaseResponseDto<Mascotas>(
                        false,
                        'Cliente no encontrado o inactivo',
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            // Si se actualiza la especie, validar que exista y esté activa
            if (updateMascotaDto.idEspecie) {
                const especieResponse = await this.especiesService.getEspecieById(updateMascotaDto.idEspecie);
                if (!especieResponse.success) {
                    return new BaseResponseDto<Mascotas>(
                        false,
                        'Especie no encontrada o inactiva',
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            // Si se actualiza la raza, validar que exista, esté activa y pertenezca a la especie
            if (updateMascotaDto.idRaza) {
                const razaResponse = await this.razasService.getRazaById(updateMascotaDto.idRaza);
                if (!razaResponse.success) {
                    return new BaseResponseDto<Mascotas>(
                        false,
                        'Raza no encontrada o inactiva',
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }

                // Validar que la raza pertenezca a la especie (actual o actualizada)
                const especieId = updateMascotaDto.idEspecie ?? mascota.idEspecie;
                if (razaResponse.data.idEspecie !== especieId) {
                    return new BaseResponseDto<Mascotas>(
                        false,
                        'La raza no pertenece a la especie seleccionada',
                        undefined,
                        null,
                        HttpStatus.BAD_REQUEST,
                    );
                }
            }

            // Si se proporciona fecha de esterilización, debe estar esterilizado
            const esterilizado = updateMascotaDto.esterilizado ?? mascota.esterilizado;
            if (updateMascotaDto.fechaEsterilizacion && !esterilizado) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Si se proporciona fecha de esterilización, la mascota debe estar marcada como esterilizada',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            // Si está fallecido, debe tener fecha de fallecimiento
            const fallecido = updateMascotaDto.fallecido ?? mascota.fallecido;
            const fechaFallecimiento = updateMascotaDto.fechaFallecimiento ?? mascota.fechaFallecimiento;
            if (fallecido && !fechaFallecimiento) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Si la mascota está fallecida, debe proporcionar la fecha de fallecimiento',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            const mascotaActualizada = this.mascotasRepository.merge(mascota, updateMascotaDto as any);
            await this.mascotasRepository.save(mascotaActualizada);

            // Obtener la mascota actualizada con relaciones
            const mascotaCompleta = await this.mascotasRepository.findOne({
                where: { idMascota: id },
                relations: ['idCliente2', 'idEspecie2', 'idRaza'],
            });

            if (!mascotaCompleta) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Error al recuperar la mascota actualizada',
                    undefined,
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }

            return new BaseResponseDto<Mascotas>(
                true,
                'Mascota actualizada exitosamente',
                mascotaCompleta,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas>(
                false,
                'Error al actualizar la mascota',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteMascota(id: string): Promise<BaseResponseDto<Mascotas>> {
        try {
            const mascota = await this.mascotasRepository.findOne({
                where: { idMascota: id },
            });

            if (!mascota) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Mascota no encontrada',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (!mascota.activo) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'La mascota ya está inactiva',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            mascota.activo = false;
            await this.mascotasRepository.save(mascota);

            return new BaseResponseDto<Mascotas>(
                true,
                'Mascota desactivada exitosamente',
                mascota,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas>(
                false,
                'Error al desactivar la mascota',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async activateMascota(id: string): Promise<BaseResponseDto<Mascotas>> {
        try {
            const mascota = await this.mascotasRepository.findOne({
                where: { idMascota: id },
            });

            if (!mascota) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Mascota no encontrada',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (mascota.activo) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'La mascota ya está activa',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            mascota.activo = true;
            await this.mascotasRepository.save(mascota);

            return new BaseResponseDto<Mascotas>(
                true,
                'Mascota activada exitosamente',
                mascota,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas>(
                false,
                'Error al activar la mascota',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async registrarFallecimiento(
        id: string,
        fechaFallecimiento: string,
        causaFallecimiento?: string,
    ): Promise<BaseResponseDto<Mascotas>> {
        try {
            const mascota = await this.mascotasRepository.findOne({
                where: { idMascota: id },
            });

            if (!mascota) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'Mascota no encontrada',
                    undefined,
                    null,
                    HttpStatus.NOT_FOUND,
                );
            }

            if (mascota.fallecido) {
                return new BaseResponseDto<Mascotas>(
                    false,
                    'La mascota ya está registrada como fallecida',
                    undefined,
                    null,
                    HttpStatus.BAD_REQUEST,
                );
            }

            mascota.fallecido = true;
            mascota.fechaFallecimiento = fechaFallecimiento;
            if (causaFallecimiento) {
                mascota.causaFallecimiento = causaFallecimiento;
            }

            await this.mascotasRepository.save(mascota);

            return new BaseResponseDto<Mascotas>(
                true,
                'Fallecimiento registrado exitosamente',
                mascota,
                null,
                HttpStatus.OK,
            );
        } catch (error) {
            return new BaseResponseDto<Mascotas>(
                false,
                'Error al registrar el fallecimiento',
                undefined,
                error,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
